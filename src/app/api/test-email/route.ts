// app/api/test-emailjs/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    const toEmail = process.env.NEXT_PUBLIC_EMAILJS_TO_EMAIL;
    const fromEmail = process.env.NEXT_PUBLIC_EMAILJS_FROM_EMAIL;

    if (!serviceId || !templateId || !publicKey) {
      return NextResponse.json(
        { error: 'Missing EmailJS configuration. Please check your environment variables.' },
        { status: 400 }
      );
    }

    // EmailJS REST API endpoint
    const response = await fetch(`https://api.emailjs.com/api/v1.0/email/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          to_email: toEmail,
          from_email: fromEmail,
          name: 'Test User',
          title: 'Test Title',
          email: 'test@example.com',
          phone: '+1234567890',
          company: 'Test Company',
          companySector: 'IT',
          companySize: '11-50',
          companyWebsite: 'https://example.com',
          recruitmentType: 'skilled',
          positionsCount: '3',
          jobTitles: 'Developer, Designer, PM',
          languageLevel: 'B1',
          requiredExperience: 'Senior',
          urgentTimeline: 'flexible',
          interest: 'recruitment',
          message: 'This is a test email from EmailJS integration.',
          html_content: '<h1>✅ EmailJS Integration Works!</h1><p>This is a test email from your AVS Tunisia application.</p>',
          text_content: 'EmailJS Integration Works!',
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to send test email');
    }

    const result = await response.json();

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully via EmailJS!',
      response: result,
      config: {
        serviceId: serviceId,
        templateId: templateId,
        toEmail: toEmail,
        fromEmail: fromEmail,
      }
    });
  } catch (error) {
    console.error('EmailJS test failed:', error);

    let errorMessage = 'Test email failed';
    let statusCode = 500;

    if (error instanceof Error) {
      errorMessage = error.message;
      
      if (errorMessage.includes('Invalid API key') || errorMessage.includes('user_id')) {
        statusCode = 401;
        errorMessage = 'Invalid EmailJS configuration. Please check your PUBLIC_KEY.';
      } else if (errorMessage.includes('template not found')) {
        statusCode = 404;
        errorMessage = 'Email template not found. Please check your TEMPLATE_ID.';
      } else if (errorMessage.includes('service not found')) {
        statusCode = 404;
        errorMessage = 'Email service not found. Please check your SERVICE_ID.';
      }
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? (error as Error).stack : undefined,
      },
      { status: statusCode }
    );
  }
}