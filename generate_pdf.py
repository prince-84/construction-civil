import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    PageBreak,
    KeepTogether,
    HRFlowable,
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b"))
        
        # Header (Pages > 1)
        if self._pageNumber > 1:
            self.drawString(54, letter[1] - 36, "BenaaOps | Saudi Civil Construction Management Portal — Project Overview")
            self.setStrokeColor(colors.HexColor("#e2e8f0"))
            self.setLineWidth(0.5)
            self.line(54, letter[1] - 42, letter[0] - 54, letter[1] - 42)

        # Footer
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(letter[0] - 54, 32, page_text)
        self.drawString(54, 32, "Confidential & Proprietary — BenaaOps Civil Operations Suite (KSA)")
        self.setStrokeColor(colors.HexColor("#e2e8f0"))
        self.setLineWidth(0.5)
        self.line(54, 42, letter[0] - 54, 42)
        
        self.restoreState()

def build_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54,
    )

    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=colors.HexColor('#0f172a'),
        spaceAfter=6,
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#d97706'),
        spaceAfter=15,
    )

    h1_style = ParagraphStyle(
        'Heading1_Custom',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=colors.HexColor('#0f172a'),
        spaceBefore=14,
        spaceAfter=8,
    )

    h2_style = ParagraphStyle(
        'Heading2_Custom',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=colors.HexColor('#1e293b'),
        spaceBefore=10,
        spaceAfter=4,
    )

    body_style = ParagraphStyle(
        'Body_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor('#334155'),
        spaceAfter=6,
    )

    bullet_style = ParagraphStyle(
        'Bullet_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#334155'),
        leftIndent=14,
        firstLineIndent=-10,
        spaceAfter=4,
    )

    story = []

    # Title & Header Banner (Pure English to prevent missing glyphs)
    story.append(Paragraph("BenaaOps — Civil Operations Portal", title_style))
    story.append(Paragraph("Saudi Civil Construction Management Portal — Technical & Functional Specification", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#f59e0b'), spaceAfter=14))

    # Executive Summary Card
    exec_text = """
    <b>BenaaOps</b> (Benaa Cloud Civil Portal) is an enterprise-grade civil engineering and site operations web application custom-built for general contractors, civil site engineers, and project consultants operating in the <b>Kingdom of Saudi Arabia (KSA)</b>. 
    The system governs physical civil and structural milestones from deep excavation to superstructure and wet trades, ensuring strict compliance with the <b>Saudi Building Code (SBC 301–305)</b>, Gulf hot-weather concrete controls, ASTM/SBC lab tests, and bilateral English (LTR) and Arabic (RTL) site operations.
    """
    story.append(Paragraph(exec_text, body_style))
    story.append(Spacer(1, 10))

    # Metadata Table
    meta_data = [
        [Paragraph("<b>Framework:</b>", body_style), Paragraph("Next.js 16 (App Router) + TypeScript", body_style),
         Paragraph("<b>UI/UX Aesthetic:</b>", body_style), Paragraph("Light Enterprise Engineering (Tailwind CSS)", body_style)],
        [Paragraph("<b>Standard Compliance:</b>", body_style), Paragraph("SBC 301-305, ASTM, ACI 305R", body_style),
         Paragraph("<b>Bilingual / RTL:</b>", body_style), Paragraph("Dual English (LTR) & Arabic (RTL) Toggle", body_style)],
        [Paragraph("<b>Target Region:</b>", body_style), Paragraph("Kingdom of Saudi Arabia (Riyadh, Jeddah, NEOM)", body_style),
         Paragraph("<b>Currency / Dates:</b>", body_style), Paragraph("SAR (Saudi Riyals) / Dual Hijri & Gregorian", body_style)]
    ]
    meta_table = Table(meta_data, colWidths=[1.4*inch, 2.2*inch, 1.4*inch, 2.0*inch])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f8fafc')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#e2e8f0')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 14))

    # Section 1: Architecture & UI/UX Principles
    story.append(Paragraph("1. Technology Stack & Light UI/UX Design System", h1_style))
    story.append(Paragraph(
        "Built according to the user's explicit directive for an <b>attractive, clean, and highly professional Light UI/UX</b> (strictly avoiding dark themes). The interface incorporates:",
        body_style
    ))
    story.append(Paragraph("• <b>Light Foundation:</b> Soft warm-slate background (<code>#f8fafc</code>), pure white surface cards, refined hairline borders (<code>#e2e8f0</code>), and elevation shadows for exceptional visual hierarchy.", bullet_style))
    story.append(Paragraph("• <b>Civil Safety Palette:</b> Architectural Amber/Gold accents (<code>#f59e0b</code>, <code>#d97706</code>) representing Saudi construction and safety heritage.", bullet_style))
    story.append(Paragraph("• <b>Native RTL Engine:</b> Seamless English to Arabic (RTL) toggling dynamically modifying directionality (<code>dir=\"rtl\"</code>) and updating civil engineering nomenclature across all data tables and modals.", bullet_style))
    story.append(Paragraph("• <b>Dual Calendar Engine:</b> Simultaneous Gregorian and Umm al-Qura Hijri date display (e.g., 19 Shawwal 1447 AH / 10 Oct 2026).", bullet_style))

    story.append(Spacer(1, 10))

    # Section 2: Core Civil Modules Breakdown
    story.append(Paragraph("2. Detailed Functional Modules Breakdown", h1_style))

    # Module 1
    story.append(Paragraph("Module 1: Executive Dashboard & Site Overview", h2_style))
    story.append(Paragraph("• <b>4 Real-Time KPI Cards:</b> Active civil zones (Raft, Columns, Slabs, Masonry), Pending RFIs awaiting Consultant sign-off, Total Concrete Poured (m3) vs project target with progress gauges, and Today's Hot Weather Safety Status.", bullet_style))
    story.append(Paragraph("• <b>Interactive Civil Milestones & Pour Timeline:</b> Visual stage-gate tracker tracking PCC Blinding & Tanking (100%), Substructure Raft (100%), Superstructure Columns & Slabs (64%), and AAC Blockwork (35%).", bullet_style))
    story.append(Paragraph("• <b>Hot Weather Pour Advisory & Ambient Simulator:</b> Interactive thermal slider (24°C to 46°C) allowing engineers to simulate ambient spikes and observe real-time SBC 304 warnings, ice batching protocols, and night pour mandates.", bullet_style))

    # Module 2
    story.append(Paragraph("Module 2: Civil Phase Tracker (WBS & Progress Ledger)", h2_style))
    story.append(Paragraph("Structured strictly into three Saudi building execution stages:", body_style))
    story.append(Paragraph("1. <b>Substructure & Deep Foundations:</b> Shoring secant piles, dewatering systems, PCC 1:4:8 blinding concrete, anti-termite chemical soil barrier, Bitumat 4mm tanking membrane, Sulfate Resisting Cement (SRC C40) raft, and 95% MDD Proctor backfilling.", bullet_style))
    story.append(Paragraph("2. <b>Superstructure & Frame:</b> Column line & plumb surveys, C45/C50 micro-silica concrete, post-tensioned (PT) strand tendon ducts, top steel clearance sign-offs, and mandatory 14-day continuous ponding curing regimes.", bullet_style))
    story.append(Paragraph("3. <b>Wet Trades & External Infrastructure:</b> AAC lightweight blockwork, reinforced lintels, 3-coat cementitious plastering with fiberglass mesh, polyurethane wet-area tanking with 48h ponding tests, and boundary walls.", bullet_style))
    story.append(Paragraph("<i>* Interactive Feature:</i> Engineers can toggle any milestone checkbox to dynamically recompute phase completion percentages.", bullet_style))

    story.append(Spacer(1, 10))

    # Module 3
    story.append(Paragraph("Module 3: KSA QA/QC & Inspection Engine (RFI / WIR / MIR & Lab)", h2_style))
    story.append(Paragraph("• <b>Work Inspection Requests (WIR / RFI):</b> Sequence generation (e.g. <code>RFI-CIV-2026-1042</code>), multi-criteria filtering by Code A (Approved), Code B (Approved with Comments), Code C (Rejected), and Pending Consultant Sign-off.", bullet_style))
    story.append(Paragraph("• <b>Official Consultant Inspection Drawer:</b> Modal drawer simulating the official consultant approval docket with inspector notes, signatures, and stamps from leading Gulf consultants (Dar Al-Handasah, Khatib & Alami, Zuhair Fayez).", bullet_style))
    story.append(Paragraph("• <b>Material Inspection Requests (MIR):</b> Tracking Mill Test Certificates (MTC) for SABIC Grade 60 and Al Rajhi rebar, ready-mix batch designs, and Bitumat waterproofing membranes.", bullet_style))
    story.append(Paragraph("• <b>ASTM / SBC Concrete Lab Cube Log:</b> Records Slump (120mm +/- 25mm), fresh mix temperature (<= 32°C limit), 7-day compressive breaks (70% threshold), and 28-day design strength compliance.", bullet_style))

    # Page Break for clean presentation
    story.append(PageBreak())

    # Module 4
    story.append(Paragraph("Module 4: Concrete Pour Scheduler & Hot Weather Logistics (SBC 304)", h2_style))
    story.append(Paragraph("• <b>Hot Weather Thermal Protocol:</b> Strict enforcement of SBC 304 placement limits. Alerts when daytime casting must shift to night windows (20:00 - 04:00) with chilled water and flake ice batching.", bullet_style))
    story.append(Paragraph("• <b>Interactive Pour Booking Engine:</b> Booking modal with volume input (m3), mix designs (C30, C35, C40, C50), placing equipment (Boom Pump 42m/56m, Static Line Pump), and a live <b>Flake Ice Replacement Slider</b> dynamically predicting delivery temperatures.", bullet_style))
    story.append(Paragraph("• <b>Printable Pour Permit Ticket:</b> Official site permit viewer complete with mix specifications, testing criteria, QC sign-offs, and print stylesheet.", bullet_style))

    story.append(Spacer(1, 8))

    # Module 5
    story.append(Paragraph("Module 5: Bar Bending Schedule (BBS) & Rebar Wastage Log", h2_style))
    story.append(Paragraph("• <b>Diameter Allocations:</b> Comprehensive tracking across standard diameters: Phi 8mm, Phi 10mm, Phi 12mm, Phi 16mm, Phi 20mm, Phi 25mm, Phi 32mm.", bullet_style))
    story.append(Paragraph("• <b>Wastage Tolerance Ledger:</b> Tonnage reconciliation comparing Delivered vs Fabricated vs Cut-off Scrap against the Saudi industry benchmark (<= 3.5% scrap tolerance). Current portal metric: <b>2.68%</b> (Compliant).", bullet_style))
    story.append(Paragraph("• <b>On-Site Rebar Calculator:</b> Practical tool calculating nominal weights using standard D2/162.2 formula, including tension lap splices (50*D) and total tonnage requirements.", bullet_style))

    story.append(Spacer(1, 14))

    # Section 3: Seed Projects
    story.append(Paragraph("3. Pre-Configured Saudi Project Datasets", h1_style))
    
    proj_headers = [Paragraph("<b>Project Name</b>", body_style), Paragraph("<b>Location & Type</b>", body_style), Paragraph("<b>Consultant & Contractor</b>", body_style), Paragraph("<b>Budget (SAR)</b>", body_style)]
    proj_rows = [
        proj_headers,
        [
            Paragraph("<b>Riyadh Commercial Tower</b><br/>(KAFD Perimeter)", body_style),
            Paragraph("Riyadh, KSA<br/>High-Rise C50 Concrete Frame", body_style),
            Paragraph("Dar Al-Handasah<br/>Al-Bawani Contracting", body_style),
            Paragraph("SAR 245,000,000<br/>68% Progress", body_style)
        ],
        [
            Paragraph("<b>Jeddah Marina Villas</b><br/>(Obhur Al Shamaliyah)", body_style),
            Paragraph("Jeddah, KSA<br/>Coastal Marine Dewatering & SRC", body_style),
            Paragraph("Khatib & Alami<br/>Nesma & Partners", body_style),
            Paragraph("SAR 112,500,000<br/>76% Progress", body_style)
        ],
        [
            Paragraph("<b>NEOM Logistic Hub</b><br/>(Zone 4 Industrial)", body_style),
            Paragraph("Tabuk / NEOM Special Zone<br/>Precast & Heavy Foundations", body_style),
            Paragraph("Zuhair Fayez Partnership<br/>Saudi Binladin Group", body_style),
            Paragraph("SAR 380,000,000<br/>40% Progress", body_style)
        ]
    ]
    proj_table = Table(proj_rows, colWidths=[2.0*inch, 2.0*inch, 1.8*inch, 1.2*inch])
    proj_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor('#f1f5f9')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#cbd5e1')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#e2e8f0')),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(proj_table)
    story.append(Spacer(1, 14))

    # Section 4: Repository & Running the Project
    story.append(Paragraph("4. Repository Links & Local Execution Guide", h1_style))
    story.append(Paragraph("• <b>Official GitHub Repository:</b> <code>https://github.com/prince-84/construction-civil.git</code>", bullet_style))
    story.append(Paragraph("• <b>Local Dev Server:</b> Run <code>npm run dev</code> (available at <code>http://localhost:3000</code>).", bullet_style))
    story.append(Paragraph("• <b>Production Build:</b> Run <code>npm run build</code> (pre-compiled with Turbopack, 100% type-safe).", bullet_style))
    story.append(Spacer(1, 14))

    # Sign-off box
    sign_data = [
        [Paragraph("<b>Prepared For:</b> Civil Engineering & Site Operations Division", body_style),
         Paragraph("<b>Standard:</b> Saudi Building Code (SBC 301-305)", body_style)],
        [Paragraph("<b>Verified By:</b> Eng. Waleed Al-Shehri (Chief Civil Inspector)", body_style),
         Paragraph("<b>Date:</b> October 2026 / Shawwal 1447 AH", body_style)]
    ]
    sign_table = Table(sign_data, colWidths=[3.5*inch, 3.5*inch])
    sign_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#fffbeb')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#fde68a')),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor('#fef3c7')),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(sign_table)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF successfully generated: {filename}")

if __name__ == '__main__':
    output_pdf = os.path.join(os.path.dirname(__file__), 'BenaaOps_Project_Documentation.pdf')
    build_pdf(output_pdf)
