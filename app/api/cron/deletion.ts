// import Product from "@/lib/models/product.model";
// import { connectToDB } from "@/lib/mongoose";
// import { NextResponse } from "next/server";

// export default async function DELETE() {
//   try {
//     connectToDB();

//     const productId = req.query.productId;

//     if (!productId) {
//       return NextResponse.json({
//         message: 'Product ID not provided',
//         success: false
//       }, { status: 400 });
//     }

//     const deletedProduct = await Product.findOneAndDelete({ _id: productId });

//     if (!deletedProduct) {
//       return NextResponse.json({
//         message: 'Product not found',
//         success: false
//       }, { status: 404 });
//     }

//     return NextResponse.json({
//       message: 'Product deleted successfully',
//       success: true
//     });
//   } catch (error) {
//     throw new Error(`Error in DELETE: ${error}`);
//   }
// }
