from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Casini Contabilitate API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    service: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=2)
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    service: Optional[str] = None
    message: str = Field(..., min_length=10)

class ContactResponse(BaseModel):
    success: bool
    message: str

# Salary Calculator Models
class SalaryCalculation(BaseModel):
    gross_salary: float
    cas: float  # 25%
    cass: float  # 10%
    taxable_income: float
    income_tax: float  # 10%
    net_salary: float
    total_deductions: float
    employer_contributions: float

class SalaryCalculationRequest(BaseModel):
    gross_salary: float = Field(..., gt=0)

# Tax Comparison Models
class TaxComparisonResult(BaseModel):
    micro: dict
    srl: dict
    pfa: dict
    recommendation: str

class TaxComparisonRequest(BaseModel):
    monthly_revenue: float = Field(..., gt=0)
    monthly_expenses: float = Field(..., ge=0)
    has_employees: bool = False

# Routes
@api_router.get("/")
async def root():
    return {"message": "Casini Contabilitate API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(input: ContactMessageCreate):
    """Submit a contact form message"""
    try:
        contact_obj = ContactMessage(**input.model_dump())
        doc = contact_obj.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.contact_messages.insert_one(doc)
        return ContactResponse(
            success=True,
            message="Mesajul a fost trimis cu succes! Vă vom contacta în cel mai scurt timp."
        )
    except Exception as e:
        logging.error(f"Error saving contact message: {e}")
        raise HTTPException(status_code=500, detail="Eroare la trimiterea mesajului")

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages():
    """Get all contact messages (admin endpoint)"""
    messages = await db.contact_messages.find({}, {"_id": 0}).to_list(1000)
    for msg in messages:
        if isinstance(msg['created_at'], str):
            msg['created_at'] = datetime.fromisoformat(msg['created_at'])
    return messages

@api_router.post("/calculator/salary", response_model=SalaryCalculation)
async def calculate_salary(input: SalaryCalculationRequest):
    """
    Calculate net salary from gross salary using 2025 Romanian tax rates.
    - CAS (pension): 25%
    - CASS (health): 10%
    - Income tax: 10% (on taxable income after CAS and CASS)
    """
    gross = input.gross_salary
    
    # Employee contributions
    cas = gross * 0.25  # Pension contribution
    cass = gross * 0.10  # Health contribution
    
    # Taxable income (after social contributions)
    taxable_income = gross - cas - cass
    
    # Income tax 10%
    income_tax = taxable_income * 0.10
    
    # Net salary
    net_salary = taxable_income - income_tax
    total_deductions = cas + cass + income_tax
    
    # Employer additional costs (approximate)
    employer_contributions = gross * 0.0225  # CAM (work insurance)
    
    return SalaryCalculation(
        gross_salary=round(gross, 2),
        cas=round(cas, 2),
        cass=round(cass, 2),
        taxable_income=round(taxable_income, 2),
        income_tax=round(income_tax, 2),
        net_salary=round(net_salary, 2),
        total_deductions=round(total_deductions, 2),
        employer_contributions=round(employer_contributions, 2)
    )

@api_router.post("/calculator/tax-comparison", response_model=TaxComparisonResult)
async def compare_taxes(input: TaxComparisonRequest):
    """
    Compare tax obligations for Micro-enterprise, SRL, and PFA.
    2025 Romanian tax rates:
    - Micro: 1% (with employees) or 3% (without employees) on revenue
    - SRL: 16% profit tax
    - PFA: 10% income tax + social contributions
    """
    revenue = input.monthly_revenue
    expenses = input.monthly_expenses
    profit = revenue - expenses
    annual_revenue = revenue * 12
    annual_profit = profit * 12
    
    # MICRO-ENTERPRISE calculation
    micro_rate = 0.01 if input.has_employees else 0.03
    micro_tax = revenue * micro_rate
    micro_net = revenue - micro_tax - expenses
    
    # SRL calculation (16% profit tax + dividend tax 8%)
    srl_profit_tax = max(0, profit * 0.16)
    srl_dividend_tax = max(0, (profit - srl_profit_tax) * 0.08)
    srl_total_tax = srl_profit_tax + srl_dividend_tax
    srl_net = profit - srl_total_tax
    
    # PFA calculation (10% income tax + CAS 25% + CASS 10%)
    # PFA pays social contributions on normalized income
    pfa_taxable = max(0, profit)
    pfa_income_tax = pfa_taxable * 0.10
    
    # CAS and CASS for PFA (on minimum wage base or actual income)
    min_wage_2025 = 4050  # Minimum wage 2025
    pfa_cas_base = max(min_wage_2025, min(pfa_taxable, min_wage_2025 * 24))
    pfa_cas = pfa_cas_base * 0.25
    pfa_cass = min_wage_2025 * 0.10  # CASS on minimum wage
    
    pfa_total_tax = pfa_income_tax + pfa_cas + pfa_cass
    pfa_net = profit - pfa_income_tax - pfa_cas - pfa_cass
    
    # Determine recommendation
    options = [
        ("Micro-întreprindere", micro_net),
        ("SRL", srl_net),
        ("PFA", pfa_net)
    ]
    best_option = max(options, key=lambda x: x[1])
    
    recommendation = f"Pentru veniturile dvs., {best_option[0]} ar fi cea mai avantajoasă opțiune fiscală."
    
    if annual_revenue > 500000:
        recommendation += " Atenție: Plafonul pentru micro-întreprindere este de 500.000 EUR/an."
    
    return TaxComparisonResult(
        micro={
            "name": "Micro-întreprindere",
            "tax_rate": f"{int(micro_rate * 100)}%",
            "monthly_tax": round(micro_tax, 2),
            "monthly_net": round(micro_net, 2),
            "annual_tax": round(micro_tax * 12, 2),
            "annual_net": round(micro_net * 12, 2),
            "notes": "Impozit pe venit, fără deduceri cheltuieli"
        },
        srl={
            "name": "SRL (Impozit pe profit)",
            "tax_rate": "16% + 8% dividend",
            "monthly_tax": round(srl_total_tax, 2),
            "monthly_net": round(srl_net, 2),
            "annual_tax": round(srl_total_tax * 12, 2),
            "annual_net": round(srl_net * 12, 2),
            "notes": "Impozit pe profit + impozit dividend"
        },
        pfa={
            "name": "PFA",
            "tax_rate": "10% + CAS + CASS",
            "monthly_tax": round(pfa_total_tax, 2),
            "monthly_net": round(pfa_net, 2),
            "annual_tax": round(pfa_total_tax * 12, 2),
            "annual_net": round(pfa_net * 12, 2),
            "notes": "Include contribuții sociale obligatorii"
        },
        recommendation=recommendation
    )

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
