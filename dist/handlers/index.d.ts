import type { Request, Response } from 'express';
export declare const createAccount: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getUser: (req: Request, res: Response) => Promise<void>;
export declare const updateProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const uploadImage: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getUserByHandle: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const searchByHandle: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
