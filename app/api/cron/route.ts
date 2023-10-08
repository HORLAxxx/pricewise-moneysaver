import Product from "@/lib/models/product.model";
import { connectToDB } from "@/lib/mongoose";
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";
import { scrapeAmazonProduct } from "@/lib/scrapper";
import { getAveragePrice, getEmailNotifType, getHighestPrice, getLowestPrice } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(){
    try {
      connectToDB();

      const products = await Product.find({});

      if(!products) throw new Error ("No products found");


      //SCRAPE LATEST PRODUCT DETAILS & UPDATE DB
      const updatedProducts = await Promise.all(
        products.map(async (currentProduct) => {
             const scrapedProduct = await scrapeAmazonProduct
             (currentProduct.url);

             if(!scrapedProduct) throw new Error("No product found");

             const updatedPriceHistory = [
                ...currentProduct.priceHistory,
                { price: scrapedProduct.currentPrice }
            ]
    
             const product = {
                ...scrapedProduct,
                priceHistory: updatedPriceHistory,
                lowestPrice: getLowestPrice(updatedPriceHistory),
                highestPrice: getHighestPrice(updatedPriceHistory),
                averagePrice: getAveragePrice(updatedPriceHistory),
            }
    
           const updatedProducts = await Product.findOneAndUpdate(
            { url: scrapedProduct.url },
              product,
           );

           // CHECK STATUS AND CHECK EMAIL ACCORDINGLY
           const emailNotifType = getEmailNotifType(scrapedProduct, currentProduct)

           if(emailNotifType && updatedProducts.users.length > 0) {
            const productInfo = {
                title: updatedProducts.title,
                url: updatedProducts.url,
            }

            const emailContent = await generateEmailBody(productInfo, emailNotifType);

            const userEmails = updatedProducts.users.map((user: any) => user.email)

            await sendEmail(emailContent, userEmails);
           }

           return updatedProducts
        })
      )
       
      return NextResponse.json({
         message:'Ok', data: updatedProducts

      })

    } catch (error) {
      throw new Error(`Error in GET: ${error}`)  
    }
}