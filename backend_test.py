import requests
import sys
import json
from datetime import datetime

class CasiniAPITester:
    def __init__(self, base_url="https://fervent-hermann-3.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=30)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=30)

            print(f"   Response Status: {response.status_code}")
            
            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ {name} - PASSED")
                try:
                    response_data = response.json()
                    print(f"   Response Data: {json.dumps(response_data, indent=2, default=str)}")
                    return True, response_data
                except:
                    return True, {}
            else:
                print(f"❌ {name} - FAILED")
                print(f"   Expected status: {expected_status}, got: {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   Error Response: {json.dumps(error_data, indent=2)}")
                except:
                    print(f"   Error Response: {response.text}")
                self.failed_tests.append({
                    "name": name,
                    "endpoint": endpoint,
                    "expected_status": expected_status,
                    "actual_status": response.status_code,
                    "error": response.text[:200]
                })
                return False, {}

        except requests.exceptions.Timeout:
            print(f"❌ {name} - FAILED - Request timeout")
            self.failed_tests.append({
                "name": name,
                "endpoint": endpoint,
                "error": "Request timeout (30s)"
            })
            return False, {}
        except Exception as e:
            print(f"❌ {name} - FAILED - Error: {str(e)}")
            self.failed_tests.append({
                "name": name,
                "endpoint": endpoint,
                "error": str(e)
            })
            return False, {}

    def test_api_root(self):
        """Test API root endpoint"""
        return self.run_test("API Root", "GET", "", 200)

    def test_salary_calculator_valid(self):
        """Test salary calculator with valid data"""
        test_data = {"gross_salary": 8000}
        success, response = self.run_test(
            "Salary Calculator (Valid)", 
            "POST", 
            "calculator/salary", 
            200, 
            data=test_data
        )
        
        if success and response:
            # Validate response structure
            required_fields = ['gross_salary', 'cas', 'cass', 'income_tax', 'net_salary', 'total_deductions']
            missing_fields = [field for field in required_fields if field not in response]
            if missing_fields:
                print(f"⚠️  Missing fields in response: {missing_fields}")
                return False
            
            # Validate calculation logic (Romanian 2025 rates)
            expected_cas = 8000 * 0.25  # 25%
            expected_cass = 8000 * 0.10  # 10%
            expected_taxable = 8000 - expected_cas - expected_cass
            expected_income_tax = expected_taxable * 0.10  # 10%
            expected_net = expected_taxable - expected_income_tax
            
            print(f"   Calculated Net Salary: {response['net_salary']} RON")
            print(f"   Expected Net Salary: {round(expected_net, 2)} RON")
            
            # Allow small rounding differences
            if abs(response['net_salary'] - expected_net) < 0.1:
                print("✅ Salary calculation is correct")
                return True
            else:
                print("⚠️  Salary calculation may be incorrect")
                return False
        
        return success

    def test_salary_calculator_invalid(self):
        """Test salary calculator with invalid data"""
        test_cases = [
            {"gross_salary": -1000},  # Negative salary
            {"gross_salary": 0},      # Zero salary
            {},                       # Missing data
        ]
        
        for i, test_data in enumerate(test_cases):
            success, _ = self.run_test(
                f"Salary Calculator Invalid #{i+1}",
                "POST",
                "calculator/salary",
                422,  # Validation error
                data=test_data
            )

    def test_tax_comparator_valid(self):
        """Test tax comparator with valid data"""
        test_data = {
            "monthly_revenue": 20000,
            "monthly_expenses": 5000,
            "has_employees": False
        }
        success, response = self.run_test(
            "Tax Comparator (Valid)",
            "POST",
            "calculator/tax-comparison",
            200,
            data=test_data
        )
        
        if success and response:
            # Validate response structure
            required_sections = ['micro', 'srl', 'pfa', 'recommendation']
            missing_sections = [section for section in required_sections if section not in response]
            if missing_sections:
                print(f"⚠️  Missing sections in response: {missing_sections}")
                return False
            
            # Validate each tax option structure
            for option in ['micro', 'srl', 'pfa']:
                option_data = response[option]
                required_fields = ['name', 'tax_rate', 'monthly_tax', 'monthly_net']
                missing_fields = [field for field in required_fields if field not in option_data]
                if missing_fields:
                    print(f"⚠️  Missing fields in {option}: {missing_fields}")
                    return False
            
            print(f"   Micro monthly net: {response['micro']['monthly_net']} RON")
            print(f"   SRL monthly net: {response['srl']['monthly_net']} RON")
            print(f"   PFA monthly net: {response['pfa']['monthly_net']} RON")
            print(f"   Recommendation: {response['recommendation']}")
            
            return True
        
        return success

    def test_tax_comparator_invalid(self):
        """Test tax comparator with invalid data"""
        test_cases = [
            {"monthly_revenue": -5000, "monthly_expenses": 0, "has_employees": False},  # Negative revenue
            {"monthly_revenue": 0, "monthly_expenses": 0, "has_employees": False},      # Zero revenue
            {"monthly_expenses": 0, "has_employees": False},                            # Missing revenue
        ]
        
        for i, test_data in enumerate(test_cases):
            success, _ = self.run_test(
                f"Tax Comparator Invalid #{i+1}",
                "POST",
                "calculator/tax-comparison",
                422,  # Validation error
                data=test_data
            )

    def test_contact_form_valid(self):
        """Test contact form with valid data"""
        test_data = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "+40722123456",
            "company": "Test Company SRL",
            "service": "contabilitate",
            "message": "Aceasta este o solicitare de test pentru servicii de contabilitate."
        }
        success, response = self.run_test(
            "Contact Form (Valid)",
            "POST",
            "contact",
            200,
            data=test_data
        )
        
        if success and response:
            # Validate response structure
            if 'success' in response and 'message' in response:
                if response['success']:
                    print("✅ Contact form submission successful")
                    return True
                else:
                    print("⚠️  Contact form returned success=false")
                    return False
            else:
                print("⚠️  Invalid contact form response structure")
                return False
        
        return success

    def test_contact_form_invalid(self):
        """Test contact form with invalid data"""
        test_cases = [
            {"email": "test@example.com", "message": "Test"},  # Missing name
            {"name": "Test", "message": "Test"},               # Missing email
            {"name": "Test", "email": "invalid-email"},        # Invalid email
            {"name": "T", "email": "test@example.com", "message": "short"},  # Too short fields
            {},  # Empty data
        ]
        
        for i, test_data in enumerate(test_cases):
            success, _ = self.run_test(
                f"Contact Form Invalid #{i+1}",
                "POST",
                "contact",
                422,  # Validation error
                data=test_data
            )

    def run_all_tests(self):
        """Run all backend API tests"""
        print("🚀 Starting Casini Backend API Tests")
        print("=" * 50)
        
        # Test API availability
        print("\n📡 Testing API Connectivity...")
        self.test_api_root()
        
        # Test Salary Calculator
        print("\n💰 Testing Salary Calculator...")
        self.test_salary_calculator_valid()
        self.test_salary_calculator_invalid()
        
        # Test Tax Comparator  
        print("\n📊 Testing Tax Comparator...")
        self.test_tax_comparator_valid()
        self.test_tax_comparator_invalid()
        
        # Test Contact Form
        print("\n📬 Testing Contact Form...")
        self.test_contact_form_valid()
        self.test_contact_form_invalid()
        
        # Print summary
        print("\n" + "=" * 50)
        print(f"📊 Test Results Summary:")
        print(f"   Tests Run: {self.tests_run}")
        print(f"   Tests Passed: {self.tests_passed}")
        print(f"   Tests Failed: {len(self.failed_tests)}")
        print(f"   Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        if self.failed_tests:
            print(f"\n❌ Failed Tests:")
            for test in self.failed_tests:
                print(f"   - {test['name']}: {test.get('error', 'Status mismatch')}")
        
        return len(self.failed_tests) == 0

def main():
    """Main function to run all tests"""
    tester = CasiniAPITester()
    success = tester.run_all_tests()
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())