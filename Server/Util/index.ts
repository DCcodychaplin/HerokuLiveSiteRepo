import express, { Request, Response, NextFunction } from 'express';

// convience function to return displayName of user
export function UserDisplayName(req: Request): string
{
    if (req.user)
    {
        let user = req.user as UserDocument;
        return user.DisplayName.toString();
    }

    return '';
}

// custom authguard middleware
export function AuthGuard(req: Request, res: Response, next: NextFunction): void
{
    if (!req.isAuthenticated())
    {
        return res.redirect('/login');
    }

    next();
}