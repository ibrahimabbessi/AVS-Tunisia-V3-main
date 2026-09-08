// src/app/api/send-formation-langue-email/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('🚀 Formation langue API route called');
  
  try {
    const data = await request.json();
    console.log('📝 Received formation langue data:', data);

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

    // ============================================================
    // FIXED: Use the CORRECT Outlook Formation service ID
    // ============================================================
    const serviceId = process.env.EMAILJS_OUTLOOK_FORMATION_SERVICE_ID;  // ✅ CORRECT
    const templateId = process.env.EMAILJS_FORMATION_LANGUE_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_OUTLOOK_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_OUTLOOK_PRIVATE_KEY;
    const toEmail = process.env.EMAILJS_OUTLOOK_TO_EMAIL || 'allemand@avstunisia.com';  // ✅ Added

    console.log('🔑 Outlook Formation Config Check:', {
      serviceId,
      hasTemplateId: !!templateId,
      hasPublicKey: !!publicKey,
      hasPrivateKey: !!privateKey,
      toEmail
    });

    if (!serviceId || !templateId || !publicKey || !privateKey) {
      return NextResponse.json(
        { 
          error: 'Outlook Formation service not properly configured',
          details: 'Missing EmailJS credentials. Please check environment variables.'
        },
        { status: 500 }
      );
    }

    // Course type mapping
    const courseTypeLabels: Record<string, string> = {
      matin: 'Matin (60h)',
      soir: 'Soir (40h)',
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
      
      // Course Information
      course_title: data.courseTitle || 'Non spécifié',
      course_type: data.courseType ? courseTypeLabels[data.courseType] || data.courseType : 'Non spécifié',
      level: data.level || 'Non spécifié',
      
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
      
      // Recipient - FIXED: Use Outlook email
      to_email: toEmail,  // ✅ Now uses allemand@avstunisia.com
    };

    console.log('📧 Sending formation langue template params:', templateParams);

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

    console.log('✅ Formation langue email sent successfully:', result);

    return NextResponse.json({
      success: true,
      message: 'Inscription envoyée avec succès !',
      data: result
    });

  } catch (error) {
    console.error('❌ Formation langue email sending error:', error);

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