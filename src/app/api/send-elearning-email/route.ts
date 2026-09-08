// src/app/api/send-elearning-email/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('🚀 E-learning API route called');
  
  try {
    const data = await request.json();
    console.log('📝 Received e-learning data:', data);

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'birthDate', 'phone', 'email', 'city'];
    const missingFields = requiredFields.filter(field => !data[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get EmailJS configuration
    const serviceId = process.env.EMAILJS_GMAIL_SERVICE_ID;
    const templateId = process.env.EMAILJS_ELEARNING_TEMPLATE_ID; // NEW template
    const publicKey = process.env.EMAILJS_GMAIL_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_GMAIL_PRIVATE_KEY;

    console.log('🔑 EmailJS Config Check:', {
      hasServiceId: !!serviceId,
      hasTemplateId: !!templateId,
      hasPublicKey: !!publicKey,
      hasPrivateKey: !!privateKey
    });

    if (!serviceId || !templateId || !publicKey || !privateKey) {
      return NextResponse.json(
        { 
          error: 'Email service not properly configured',
          details: 'Missing EmailJS credentials.'
        },
        { status: 500 }
      );
    }

    // Formation labels mapping
    const formationLabels: Record<string, string> = {
      technique: '💻 Formation Technique',
      'soft-skills': '👥 Soft Skills',
      'graphic-design': '🎨 Graphic Design',
      'marketing-digital': '📢 Marketing Digital',
      autres: '💼 Autres',
    };

    // Build template parameters
    const templateParams = {
      // Personal Information
      first_name: data.firstName,
      last_name: data.lastName,
      birth_date: data.birthDate,
      phone: data.phone,
      email: data.email,
      city: data.city,
      
      // Formation
      formation: formationLabels[data.formation] || data.formation || 'Non spécifié',
      
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
      
      // Recipient
      to_email: 'info@avstunisia.com',
    };

    console.log('📧 Sending e-learning template params:', templateParams);

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

    const responseText = await emailjsResponse.text();
    console.log('📨 EmailJS Response Status:', emailjsResponse.status);
    console.log('📨 EmailJS Response Body:', responseText);

    if (!emailjsResponse.ok) {
      let errorMessage = 'Failed to send email';
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

    console.log('✅ E-learning email sent successfully:', result);

    return NextResponse.json({
      success: true,
      message: 'Inscription envoyée avec succès !',
      data: result
    });

  } catch (error) {
    console.error('❌ E-learning email sending error:', error);

    let errorMessage = 'Failed to send inscription';
    let statusCode = 500;

    if (error instanceof Error) {
      errorMessage = error.message;
      
      if (errorMessage.toLowerCase().includes('invalid api key') || 
          errorMessage.toLowerCase().includes('authentication')) {
        statusCode = 401;
        errorMessage = 'Configuration EmailJS invalide. Veuillez vérifier vos identifiants.';
      } else if (errorMessage.toLowerCase().includes('template not found')) {
        statusCode = 404;
        errorMessage = 'Template EmailJS non trouvé. Veuillez vérifier votre TEMPLATE_ID.';
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