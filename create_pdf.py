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
    HRFlowable
)
from reportlab.graphics.barcode import qr
from reportlab.graphics.shapes import Drawing

def create_overview_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    story = []
    styles = getSampleStyleSheet()

    # Custom Palette
    NAVY = colors.HexColor('#171A2E')
    LAVENDER = colors.HexColor('#7B68EE')
    LAVENDER_LIGHT = colors.HexColor('#F4F2FF')
    MINT = colors.HexColor('#2E8B57')
    MINT_LIGHT = colors.HexColor('#EBF7F1')
    MUTED_TEXT = colors.HexColor('#5F6480')
    CARD_BG = colors.HexColor('#F8F8FD')
    BORDER_COLOR = colors.HexColor('#E2E0F2')

    # Custom Paragraph Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=NAVY
    )

    tagline_style = ParagraphStyle(
        'DocTagline',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=LAVENDER
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=NAVY,
        spaceAfter=6
    )

    body_style = ParagraphStyle(
        'BodyDark',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor('#2A2D3D')
    )

    bullet_style = ParagraphStyle(
        'BulletText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#33384D')
    )

    link_style = ParagraphStyle(
        'LinkText',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=LAVENDER
    )

    code_style = ParagraphStyle(
        'CodeText',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=12,
        textColor=NAVY
    )

    # ---------------- PAGE 1 ----------------

    # Header Bar
    header_data = [
        [
            Paragraph("<b>FLOWSTATE</b>", title_style),
            Paragraph("<b>Progressive Web App (PWA)</b><br/><font color='#5F6480'>Digital Wellness & Focus</font>", ParagraphStyle('HRight', parent=styles['Normal'], fontName='Helvetica', fontSize=9, leading=13, alignment=2, textColor=NAVY))
        ],
        [
            Paragraph("<i>Focus Better. Live Better.</i>", tagline_style),
            Paragraph("<font color='#2E8B57'><b>● Live & Online</b></font>", ParagraphStyle('HStatus', parent=styles['Normal'], fontName='Helvetica', fontSize=9, leading=13, alignment=2))
        ]
    ]
    header_table = Table(header_data, colWidths=[360, 180])
    header_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 10))
    story.append(HRFlowable(width="100%", thickness=1.5, color=BORDER_COLOR, spaceBefore=0, spaceAfter=12))

    # Hero Box: Link + QR Code + Quick Install
    qr_widget = qr.QrCodeWidget('https://divyanshkhare-06.github.io/flostate/')
    qr_widget.barWidth = 84
    qr_widget.barHeight = 84
    qr_widget.qrVersion = 2
    d = Drawing(84, 84)
    d.add(qr_widget)

    link_box_content = [
        Paragraph("<b>Official Web Application Link:</b>", ParagraphStyle('Lbl', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=10, textColor=NAVY)),
        Paragraph("<a href='https://divyanshkhare-06.github.io/flostate/' color='#7B68EE'><u>https://divyanshkhare-06.github.io/flostate/</u></a>", link_style),
        Spacer(1, 4),
        Paragraph("<b>GitHub Repository:</b> <a href='https://github.com/Divyanshkhare-06/flostate' color='#5F6480'><u>github.com/Divyanshkhare-06/flostate</u></a>", ParagraphStyle('GhLbl', parent=styles['Normal'], fontName='Helvetica', fontSize=8.5, textColor=MUTED_TEXT)),
        Spacer(1, 4),
        Paragraph("<b>Universal App Installation:</b> Open the link on iPhone (<i>Safari > Share > Add to Home Screen</i>), Android (<i>Chrome > Install App</i>), or Desktop (<i>Chrome/Edge > Install Icon</i>) to run standalone with 100% offline support.", ParagraphStyle('PwaDesc', parent=styles['Normal'], fontName='Helvetica', fontSize=8.5, leading=12, textColor=colors.HexColor('#4A4E66')))
    ]

    hero_table_data = [
        [link_box_content, d]
    ]
    hero_table = Table(hero_table_data, colWidths=[430, 110])
    hero_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), LAVENDER_LIGHT),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#D5D0F8')),
        ('ROUNDEDCORNERS', [8, 8, 8, 8]),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('ALIGN', (1,0), (1,0), 'CENTER'),
    ]))
    story.append(hero_table)
    story.append(Spacer(1, 14))

    # Executive Overview
    story.append(Paragraph("<b>1. Executive Product Overview</b>", section_heading))
    overview_p = (
        "<b>FLOWSTATE</b> is a clean, minimal digital wellness platform engineered primarily for college students "
        "and professionals battling concentration fatigue, compulsive phone checks, irregular sleep schedules, and attention fragmentation. "
        "Unlike conventional productivity tools that overwhelm users with aggressive notifications, red error badges, and stressful streak penalties, "
        "FLOWSTATE operates on a gentle principle: <b>it never demands attention; it provides a quiet sanctuary to regain it.</b> "
        "The application is client-side, zero-backend, and fully persistent via LocalStorage."
    )
    story.append(Paragraph(overview_p, body_style))
    story.append(Spacer(1, 12))

    # 4 Main Feature Cards
    story.append(Paragraph("<b>2. Core Feature Pillars</b>", section_heading))

    col1_w = 264
    col2_w = 264

    # Focus Studio & Digital Detox
    card_focus = [
        Paragraph("<b>FOCUS STUDIO & DISTRACTION PARKING</b>", ParagraphStyle('CTitle', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=9.5, textColor=LAVENDER)),
        Spacer(1, 3),
        Paragraph("• <b>Single-Tasking Timer:</b> 25m (Pomodoro), 45m (College Block), and 60m deep flow presets + custom minute duration.", bullet_style),
        Paragraph("• <b>Distraction Parking Lot:</b> Capture impulsive thoughts (e.g. <i>'Check email'</i>) without breaking concentration. Review parked items post-session.", bullet_style),
        Paragraph("• <b>Zero-Guilt Rescue Mode:</b> Stopped early? No negative scores. Restart gently with 10 minutes or take a restorative break.", bullet_style),
        Paragraph("• <b>Offline Soundscapes:</b> Crystal singing bowl harmonic chime synthesized via Web Audio API (zero audio files needed).", bullet_style)
    ]

    card_detox = [
        Paragraph("<b>DIGITAL DETOX & NOTIFICATION AUDIT</b>", ParagraphStyle('CTitle', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=9.5, textColor=MINT)),
        Spacer(1, 3),
        Paragraph("• <b>Notification Audit:</b> Triage 6 channels (Calls, Academics, Work, Social, Promotions, Entertainment) into Essential, Important, or Distracting.", bullet_style),
        Paragraph("• <b>Attention Breakdown:</b> Instant visual progress metrics with concrete tips to silence cognitive leaks.", bullet_style),
        Paragraph("• <b>Mindful Scrolling Simulation:</b> Set 5, 10, or 15-minute intentional windows ending with: <i>'Are you still scrolling intentionally?'</i>.", bullet_style),
        Paragraph("• <b>Digital Habit Reflections:</b> Identifies study interruption triggers and friction points.", bullet_style)
    ]

    pillars_row1 = Table([[card_focus, card_detox]], colWidths=[col1_w, col2_w])
    pillars_row1.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), CARD_BG),
        ('BACKGROUND', (1,0), (1,0), CARD_BG),
        ('BOX', (0,0), (0,0), 1, BORDER_COLOR),
        ('BOX', (1,0), (1,0), 1, BORDER_COLOR),
        ('ROUNDEDCORNERS', [6, 6, 6, 6]),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(pillars_row1)
    story.append(Spacer(1, 8))

    # Sleep & Garden
    card_sleep = [
        Paragraph("<b>SLEEP & CIRCADIAN DIGITAL SUNSET</b>", ParagraphStyle('CTitle', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=9.5, textColor=colors.HexColor('#D97706'))),
        Spacer(1, 3),
        Paragraph("• <b>Bedtime Planner:</b> Calculates sleep hours and automatically schedules 45-minute wind-down buffers before sleep.", bullet_style),
        Paragraph("• <b>Wind-down Checklist:</b> Customizable nighttime routines (close tabs, stow devices, read, stretch).", bullet_style),
        Paragraph("• <b>Digital Sunset Mode:</b> Transforms UI into warm amber dusk tones to curb blue-light excitation.", bullet_style),
        Paragraph("• <b>4-7-8 Breathing Guide:</b> Expanding & contracting circle visualizer to activate parasympathetic calm.", bullet_style)
    ]

    card_garden = [
        Paragraph("<b>MY GARDEN & HABIT SANCTUARY</b>", ParagraphStyle('CTitle', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=9.5, textColor=colors.HexColor('#2E8B57'))),
        Spacer(1, 3),
        Paragraph("• <b>Living Botanical Garden:</b> Consistency nurtures 5 SVG plants: <i>Lavender, Peace Lily, Bonsai, Jade, Mint</i>.", bullet_style),
        Paragraph("• <b>5 Progressive Growth Stages:</b> Sprouting > Young Foliage > Budding > Blooming > Flourishing.", bullet_style),
        Paragraph("• <b>Resilient Growth:</b> Missed days NEVER punish or wither plants. Growth patiently awaits your return.", bullet_style),
        Paragraph("• <b>7-Day Habit Matrix:</b> Track habits like reading, hydration, and phone-free mornings.", bullet_style)
    ]

    pillars_row2 = Table([[card_sleep, card_garden]], colWidths=[col1_w, col2_w])
    pillars_row2.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), CARD_BG),
        ('BACKGROUND', (1,0), (1,0), CARD_BG),
        ('BOX', (0,0), (0,0), 1, BORDER_COLOR),
        ('BOX', (1,0), (1,0), 1, BORDER_COLOR),
        ('ROUNDEDCORNERS', [6, 6, 6, 6]),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(pillars_row2)

    # Footer for page 1
    story.append(Spacer(1, 14))
    footer_p = Paragraph("<font color='#8E93B0'>FLOWSTATE Overview & Architecture • Page 1 of 2 • Developed by Divyansh Khare</font>", ParagraphStyle('Ftr', parent=styles['Normal'], fontName='Helvetica', fontSize=8, alignment=1))
    story.append(footer_p)

    story.append(PageBreak())

    # ---------------- PAGE 2 ----------------

    story.append(Paragraph("<b>3. Insights, Analytics & Reflective Reports</b>", section_heading))
    insights_text = (
        "FLOWSTATE avoids clinical diagnostic claims, instead offering reflective awareness charts using Recharts:<br/>"
        "• <b>Focus Trends:</b> 7-day Area Chart displaying daily minutes spent in uninterrupted flow.<br/>"
        "• <b>Habit Consistency:</b> Bar Chart visualizing completed routines and highlighting the week's most consistent habit.<br/>"
        "• <b>Daily Pulse Mood Patterns:</b> Donut chart tracking emotional state balance (<i>Energetic, Focused, Okay, Overwhelmed, Tired</i>).<br/>"
        "• <b>Automated Weekly Wellness Report:</b> Plain-English synthesized summary of completed sessions and recommended focus.<br/>"
        "• <b>One-Click Demo Mode:</b> Populates realistic 7-day student study data for instant visual demonstration."
    )
    story.append(Paragraph(insights_text, body_style))
    story.append(Spacer(1, 12))

    story.append(Paragraph("<b>4. Technical Architecture & Engineering Specifications</b>", section_heading))

    tech_table_data = [
        [Paragraph("<b>Component</b>", code_style), Paragraph("<b>Technology / Implementation</b>", code_style), Paragraph("<b>Key Advantage</b>", code_style)],
        [Paragraph("Frontend Framework", body_style), Paragraph("React 19 + Vite 8", body_style), Paragraph("Sub-second build times, modular React components", body_style)],
        [Paragraph("Design System", body_style), Paragraph("Tailwind CSS 4 + CSS Variables", body_style), Paragraph("Instant runtime switching between Light, Dark, Sunset", body_style)],
        [Paragraph("State & Storage", body_style), Paragraph("React Context + LocalStorage", body_style), Paragraph("100% private, zero-backend, zero trackers, offline ready", body_style)],
        [Paragraph("Data Visualizations", body_style), Paragraph("Recharts", body_style), Paragraph("Lightweight, responsive, clean SVG charts", body_style)],
        [Paragraph("Sound Synthesis", body_style), Paragraph("Web Audio API (Oscillators)", body_style), Paragraph("Harmonic singing bowl chimes without external audio assets", body_style)],
        [Paragraph("PWA Capabilities", body_style), Paragraph("Service Worker (sw.js) + Manifest", body_style), Paragraph("Installable to home screen / dock with offline caching", body_style)],
        [Paragraph("Hosting & Routing", body_style), Paragraph("GitHub Pages + HashRouter", body_style), Paragraph("Flawless SPA routing on any static host or subfolder", body_style)],
    ]
    tech_table = Table(tech_table_data, colWidths=[120, 180, 240])
    tech_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), LAVENDER_LIGHT),
        ('BOX', (0,0), (-1,-1), 1, BORDER_COLOR),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(tech_table)
    story.append(Spacer(1, 14))

    # Design System & Palette Summary
    story.append(Paragraph("<b>5. Design System & Palette Hierarchy</b>", section_heading))
    palette_data = [
        [
            Paragraph("<b>Deep Navy</b><br/>#171A2E<br/><font color='#5F6480'>Text & Anchors</font>", ParagraphStyle('P1', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=11, alignment=1)),
            Paragraph("<b>Lavender</b><br/>#A99BFF<br/><font color='#5F6480'>Primary Focus</font>", ParagraphStyle('P2', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=11, alignment=1)),
            Paragraph("<b>Soft Purple</b><br/>#EAE6FF<br/><font color='#5F6480'>Subtle Containers</font>", ParagraphStyle('P3', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=11, alignment=1)),
            Paragraph("<b>Mint</b><br/>#B8E6D0<br/><font color='#5F6480'>Habits & Breaks</font>", ParagraphStyle('P4', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=11, alignment=1)),
            Paragraph("<b>Off-White</b><br/>#F8F8FC<br/><font color='#5F6480'>Clean Canvas</font>", ParagraphStyle('P5', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=11, alignment=1)),
            Paragraph("<b>Sunset Dusk</b><br/>#E09F67<br/><font color='#5F6480'>Night Sanctuary</font>", ParagraphStyle('P6', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=11, alignment=1)),
        ]
    ]
    palette_table = Table(palette_data, colWidths=[90, 90, 90, 90, 90, 90])
    palette_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (0,0), colors.HexColor('#E8EAF6')),
        ('BACKGROUND', (1,0), (1,0), colors.HexColor('#EDE7F6')),
        ('BACKGROUND', (2,0), (2,0), colors.HexColor('#F3E5F5')),
        ('BACKGROUND', (3,0), (3,0), colors.HexColor('#E8F5E9')),
        ('BACKGROUND', (4,0), (4,0), colors.HexColor('#FAFAFA')),
        ('BACKGROUND', (5,0), (5,0), colors.HexColor('#FFF3E0')),
        ('BOX', (0,0), (-1,-1), 1, BORDER_COLOR),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('ROUNDEDCORNERS', [4, 4, 4, 4]),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
    ]))
    story.append(palette_table)
    story.append(Spacer(1, 14))

    # Installation & Quick Links
    story.append(Paragraph("<b>6. Access & Deployment Reference</b>", section_heading))
    deploy_box = [
        Paragraph("<b>• Live App URL:</b> <a href='https://divyanshkhare-06.github.io/flostate/' color='#7B68EE'><u>https://divyanshkhare-06.github.io/flostate/</u></a>", body_style),
        Paragraph("<b>• Source Code:</b> <a href='https://github.com/Divyanshkhare-06/flostate' color='#5F6480'><u>https://github.com/Divyanshkhare-06/flostate</u></a>", body_style),
        Paragraph("<b>• PWA Verification:</b> Validated with Web App Manifest (`manifest.json`), service worker offline caching, and native install prompts.", body_style),
        Paragraph("<b>• Local Development:</b> Clone repository, execute <code>npm install</code>, and run <code>npm run dev</code> (port 5173).", body_style),
    ]
    deploy_table = Table([[deploy_box]], colWidths=[540])
    deploy_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), CARD_BG),
        ('BOX', (0,0), (-1,-1), 1, BORDER_COLOR),
        ('ROUNDEDCORNERS', [6, 6, 6, 6]),
        ('TOPPADDING', (0,0), (-1,-1), 8),
        ('BOTTOMPADDING', (0,0), (-1,-1), 8),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(deploy_table)

    story.append(Spacer(1, 22))
    footer_p2 = Paragraph("<font color='#8E93B0'>FLOWSTATE — Designed & Crafted by Divyansh Khare • Hosted on GitHub Pages</font>", ParagraphStyle('Ftr2', parent=styles['Normal'], fontName='Helvetica', fontSize=8, alignment=1))
    story.append(footer_p2)

    doc.build(story)
    print(f"PDF successfully created at: {output_path}")

if __name__ == '__main__':
    pdf_path = os.path.abspath("FLOWSTATE_App_Overview.pdf")
    create_overview_pdf(pdf_path)
