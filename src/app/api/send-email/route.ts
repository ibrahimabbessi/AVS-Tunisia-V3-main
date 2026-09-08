// app/api/send-email/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('🚀 API route called');
  
  try {
    // Parse request data
    const data = await request.json();
    console.log('📝 Received data:', data);

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'company', 'positionsCount', 'jobTitles'];
    const missingFields = requiredFields.filter(field => !data[field]);

    if (missingFields.length > 0) {
      console.log('❌ Missing fields:', missingFields);
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      console.log('❌ Invalid email:', data.email);
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Format labels
    const recruitmentTypeLabels: Record<string, string> = {
      skilled: '👨‍💼 Talents qualifiés',
      ausbildung: '👨‍🎓 Formation (Ausbildung)',
      both: '📋 Les deux',
    };

    const languageLevelLabels: Record<string, string> = {
      a1: 'A1 - Débutant',
      a2: 'A2 - Élémentaire',
      b1: 'B1 - Intermédiaire',
      b2: 'B2 - Intermédiaire avancé',
      c1: 'C1 - Avancé',
      c2: 'C2 - Courant / Bilingue',
      'not-required': 'Non requis',
    };

    const interestLabels: Record<string, string> = {
      recruitment: '🤝 Recrutement de talents',
      recruitment_ausbildung: '👨‍🎓 Recrutement pour l\'Ausbildung',
      bulk_recruitment: '🏢 Recrutement en masse (+10 postes)',
      partnership: '🤝 Partenariat stratégique',
      consulting: '💡 Conseil en recrutement international',
      other: '📝 Autre',
    };

    const sectorLabels: Record<string, string> = {
      automotive: '🚗 Automobile',
      it: '💻 Informatique / IT',
      healthcare: '🏥 Santé / Médical',
      engineering: '⚙️ Ingénierie',
      logistics: '🚚 Logistique',
      pharma: '💊 Pharmaceutique',
      hospitality: '🏨 Hôtellerie / Restauration',
      construction: '🏗️ BTP / Construction',
      retail: '🛍️ Commerce / Distribution',
      finance: '💰 Finance / Assurance',
      education: '📚 Éducation / Formation',
      energy: '⚡ Énergie / Environnement',
      other: '📌 Autre',
    };

    const urgencyLabels: Record<string, string> = {
      flexible: '📅 Flexible (6+ mois)',
      '3months': '⏳ Dans 3 mois',
      immediate: '🔴 Immédiat (urgence)',
    };

    const experienceLabels: Record<string, string> = {
      entry: 'Débutant (0-2 ans)',
      mid: 'Intermédiaire (2-5 ans)',
      senior: 'Senior (5-10 ans)',
      expert: 'Expert (10+ ans)',
    };

    // Get EmailJS configuration
    const serviceId = process.env.EMAILJS_GMAIL_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_GMAIL_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_GMAIL_PRIVATE_KEY;

    console.log('🔑 EmailJS Config Check:', {
      hasServiceId: !!serviceId,
      hasTemplateId: !!templateId,
      hasPublicKey: !!publicKey,
      hasPrivateKey: !!privateKey
    });

    if (!serviceId || !templateId || !publicKey || !privateKey) {
      console.error('❌ Missing EmailJS environment variables');
      return NextResponse.json(
        { 
          error: 'Email service not properly configured',
          details: 'Missing EmailJS credentials. Please check server environment variables.'
        },
        { status: 500 }
      );
    }

    // ⭐ USING SNAKE_CASE FOR ALL TEMPLATE VARIABLES ⭐
    const templateParams = {
      // Contact Information
      name: data.name,
      title: data.title || 'Non spécifié',
      email: data.email,
      phone: data.phone,
      
      // Company Information - snake_case
      company: data.company,
      company_sector: sectorLabels[data.companySector] || data.companySector || 'Non spécifié',
      company_size: data.companySize || 'Non spécifié',
      company_website: data.companyWebsite || 'Non spécifié',
      
      // Recruitment Information - snake_case
      recruitment_type: recruitmentTypeLabels[data.recruitmentType] || data.recruitmentType,
      positions_count: data.positionsCount,
      job_titles: data.jobTitles,
      language_level: languageLevelLabels[data.languageLevel] || data.languageLevel,
      required_experience: experienceLabels[data.requiredExperience] || data.requiredExperience || 'Non spécifié',
      urgent_timeline: urgencyLabels[data.urgentTimeline] || data.urgentTimeline,
      
      // Collaboration
      interest: interestLabels[data.interest] || data.interest,
      
      // Message
      message: data.message || 'Aucun message supplémentaire',
      
      // Date
      date: new Date().toLocaleString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      
      // ⭐ RECIPIENT EMAIL ⭐
      to_email: 'info@avstunisia.com',
    };

    console.log('📧 Sending template params:', templateParams);

    // Send email via EmailJS REST API
    const emailjsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: privateKey,
        template_params: templateParams,
      }),
    });

    // Get response text
    const responseText = await emailjsResponse.text();
    console.log('📨 EmailJS Response Status:', emailjsResponse.status);
    console.log('📨 EmailJS Response Body:', responseText);

    if (!emailjsResponse.ok) {
      let errorMessage = 'Failed to send email via EmailJS';
      try {
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.error || errorData.message || errorMessage;
      } catch (e) {
        errorMessage = responseText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      result = { success: true, message: 'Email sent successfully' };
    }

    console.log('✅ Email sent successfully:', result);

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      data: result
    });

  } catch (error) {
    console.error('❌ Email sending error:', error);

    let errorMessage = 'Failed to send email';
    let statusCode = 500;

    if (error instanceof Error) {
      errorMessage = error.message;
      
      if (errorMessage.toLowerCase().includes('invalid api key') || 
          errorMessage.toLowerCase().includes('authentication')) {
        statusCode = 401;
        errorMessage = 'Invalid EmailJS configuration. Please check your credentials.';
      } else if (errorMessage.toLowerCase().includes('template not found')) {
        statusCode = 404;
        errorMessage = 'Email template not found. Please check your template ID.';
      } else if (errorMessage.toLowerCase().includes('service not found')) {
        statusCode = 404;
        errorMessage = 'Email service not found. Please check your service ID.';
      } else if (errorMessage.toLowerCase().includes('rate limit')) {
        statusCode = 429;
        errorMessage = 'Rate limit exceeded. Please wait a moment and try again.';
      }
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
      },
      { status: statusCode }
    );
  }
}