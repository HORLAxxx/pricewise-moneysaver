import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface Props{
    product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Link href={`/products/${product._id}`} className="product-card">
      <div className="product-card_img-container">
        <Image 
           src={product.image}
           alt={product.title}
           width={200}
           height={200}
           className="product-card_img"
          />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="product-title">{product.title}</h3>

        <div className="flex justify-between">
            <p className="text-black opacity-50 text-lg capitalize">
                {product.category}
            </p>

            <p className="text-black text-lg font-semibold">
                <span>{product?.currency}</span>
                <span>{product?.currentPrice}</span>
            </p>

        </div>
      </div>
    </Link>
  )
}

export default ProductCard

// "use client"

// import React, { useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Product } from '@/types';

// interface Props {
//   product: Product;
// }

// const ProductCard = ({ product }: Props) => {
//   const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

//   const handleShowDeleteConfirmation = () => {
//     setShowDeleteConfirmation(true);
//   };

//   const handleHideDeleteConfirmation = () => {
//     setShowDeleteConfirmation(false);
//   };

//   const handleDelete = async () => {
//     try {
//       const response = await fetch(`/api/products/${product._id}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         console.log(`Product with ID ${product._id} deleted successfully.`);
//       } else {
//         console.error('Failed to delete product:', response.statusText);
//       }

//       setShowDeleteConfirmation(false);
//     } catch (error) {
//       console.error('Error deleting product:', error);
//     }
//   };

//   return (
//     <Link href={`/products/${product._id}`} className="product-card">
//       <div className="product-card_img-container">
//         <Image
//           src={product.image}
//           alt={product.title}
//           width={200}
//           height={200}
//           className="product-card_img"
//         />
//       </div>

//       <div className="flex flex-col gap-3">
//         <h3 className="product-title">{product.title}</h3>

//         <div className="flex justify-between">
//           <p className="text-black opacity-50 text-lg capitalize">
//             {product.category}
//           </p>

//           <p className="text-black text-lg font-semibold">
//             <span>{product?.currency}</span>
//             <span>{product?.currentPrice}</span>
//           </p>

//           <button onClick={handleShowDeleteConfirmation}>
//             Delete Product
//           </button>

//           {showDeleteConfirmation && (
//             <div className="delete-confirmation-modal">
//               <p>Are you sure you want to delete this product?</p>
//               <button onClick={handleDelete}>Yes</button>
//               <button onClick={handleHideDeleteConfirmation}>No</button>
//             </div>
//           )}
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default ProductCard;