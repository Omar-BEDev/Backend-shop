import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import * as productService from '../services/products.service';
import { ApiError } from '../utils/ApiError';
import { rmSync } from 'fs';

export const addProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const productData = productService.makeProductData(req.body);
    const newProduct = await productService.createProduct(productData);
    res.status(201).json({
        status: 'success',
        message: 'Product created successfully',
        data: newProduct
    });
});

export const updateProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {productId} = req.params
    if (typeof productId !== "string") throw new ApiError("invalid product id",400)
    const newInfoProduct = await productService.updateProduct(req.body,productId)
    res.status(200).json({
        message : "updated product successflly",
        product : newInfoProduct
    })
});

export const deleteProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    if (typeof productId !== "string") throw new ApiError("invalid product id",400)
    const result = await productService.deleteProduct(productId);
    res.status(200).json({
        status: 'success',
        message: result.message
    });
});

export const getProducts = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const products = await productService.getAllProduct() 
    res.status(200).json({
        message : "get products is successfuly", 
        products : products
    })
});
