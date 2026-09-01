// src/app/api/cloudinary/folder/route.ts
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";

// Configure Cloudinary with explicit error handling
function configureCloudinary() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  console.log('🔧 Cloudinary Configuration Check:');
  console.log(`- Cloud Name: ${cloudName ? '✅ Set' : '❌ Missing'}`);
  console.log(`- API Key: ${apiKey ? '✅ Set' : '❌ Missing'}`);
  console.log(`- API Secret: ${apiSecret ? '✅ Set' : '❌ Missing'}`);

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      `Missing Cloudinary credentials: ${!cloudName ? 'CLOUD_NAME ' : ''}${!apiKey ? 'API_KEY ' : ''}${!apiSecret ? 'API_SECRET' : ''}`
    );
  }

  cloudinary.v2.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });

  return cloudinary;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const folderId = searchParams.get("folderId");

    if (!folderId) {
      return NextResponse.json(
        { error: "Folder ID is required" },
        { status: 400 }
      );
    }

    console.log(`📁 Fetching images from folder: ${folderId}`);

    // Configure and get Cloudinary instance
    const cloud = configureCloudinary();

    const result = await cloud.v2.api.resources({
      type: "upload",
      prefix: folderId,
      max_results: 100,
      context: true,
    });

    console.log(`✅ Found ${result.resources.length} images in ${folderId}`);

    return NextResponse.json({
      resources: result.resources,
      total: result.resources.length,
      folder: folderId,
    });

  } catch (error) {
    console.error("❌ Error fetching folder images:", error);
    
    // Return more detailed error for debugging
    return NextResponse.json(
      { 
        error: "Failed to fetch images", 
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}