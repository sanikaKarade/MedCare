import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      formData,
      cart,
      totalAmount,
    } = await req.json();

    // Verify Razorpay Signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment signature",
        },
        { status: 400 }
      );
    }

    // Save Order
    const order = await prisma.order.create({
      data: {
        userId,
        totalAmount,
        status: "PAID",

        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,

        customerName: formData.name,
        customerPhone: formData.phone,
        customerEmail: formData.email,

        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
      },
    });

    // Save Order Items
    await prisma.orderItem.createMany({
      data: cart.map((item: any) => ({
        orderId: order.id,
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
    });
  } catch (error) {
    console.error("Verify Payment Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Verification failed",
      },
      { status: 500 }
    );
  }
}