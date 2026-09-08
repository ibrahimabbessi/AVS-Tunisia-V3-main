// src/app/api/send-candidate-consultation/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('🚀 Candidate consultation API route called');
  
  try {
    const data = await request.json();
    console.log('📝 Received candidate consultation data:', data);

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'interest', 'message'];
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

    // ============================================================
    // FIXED: Use the CORRECT Outlook Consultation service ID
    // ============================================================
    const serviceId = process.env.EMAILJS_OUTLOOK_CONSULTATION_SERVICE_ID;  // ✅ CORRECT
    const templateId = process.env.EMAILJS_CANDIDATE_CONSULTATION_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_OUTLOOK_PUBLIC_KEY;      // ✅ Shared Outlook key
    const privateKey = process.env.EMAILJS_OUTLOOK_PRIVATE_KEY;    // ✅ Shared Outlook key
    const toEmail = process.env.EMAILJS_OUTLOOK_TO_EMAIL || 'allemand@avstunisia.com';  // ✅ Added

    console.log('🔑 Outlook Consultation Config Check:', {
      serviceId,
      hasTemplateId: !!templateId,
      hasPublicKey: !!publicKey,
      hasPrivateKey: !!privateKey,
      toEmail
    });

    if (!serviceId || !templateId || !publicKey || !privateKey) {
      return NextResponse.json(
        { 
          error: 'Outlook Consultation service not properly configured',
          details: 'Missing EmailJS credentials. Please check environment variables.'
        },
        { status: 500 }
      );
    }

    // Interest labels mapping
    const interestLabels: Record<string, string> = {
      training: '📚 Training Programs',
      employment: '💼 International Employment',
      visa: '🛂 Visa & Immigration Support',
      relocation: '🏠 Relocation Assistance',
      career: '📈 Career Development',
      general: '📝 General Inquiry',
    };

    // Build template parameters
    const templateParams = {
      // Personal Information
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      
      // Consultation
      interest: interestLabels[data.interest] || data.interest || 'Non spécifié',
      message: data.message || 'Aucun message supplémentaire',
      
      // Date
      date: new Date().toLocaleString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      
      // Recipient - FIXED: Use Outlook email
      to_email: toEmail,  // ✅ Now uses allemand@avstunisia.com
    };

    console.log('📧 Sending candidate consultation template params:', templateParams);

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

    console.log('✅ Candidate consultation email sent successfully:', result);

    return NextResponse.json({
      success: true,
      message: 'Consultation request sent successfully!',
      data: result
    });

  } catch (error) {
    console.error('❌ Candidate consultation email sending error:', error);

    let errorMessage = 'Failed to send consultation request';
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
      } else if (errorMessage.toLowerCase().includes('service not found')) {
        statusCode = 404;
        errorMessage = 'Service EmailJS non trouvé. Veuillez vérifier votre SERVICE_ID.';
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