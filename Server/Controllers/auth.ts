/*
 * Cody Chaplin - 100557080
 * Logan Morris - 100795796
 * 22/04/2022
 */

import express, {Request, Response, NextFunction} from 'express';
import passport from 'passport';

import User from '../Models/user';
import { GenerateToken, UserDisplayName } from '../Util/index';

// display functions
export function DisplayLoginPage(req: Request, res: Response, next: NextFunction): void
{
    if (!req.user)
    {
        return res.render('index', { title: 'Login', page: 'login',
            messages: req.flash('loginMessage'), displayName: UserDisplayName(req) });
    }

    return res.redirect('/contact-list');
}

export function DisplayRegisterPage(req: Request, res: Response, next: NextFunction): void
{
    if (!req.user)
    {
        return res.render('index', { title: 'Register', page: 'register',
            messages: req.flash('registerMessage'), displayName: UserDisplayName(req) });
    }

    return res.redirect('/contact-list');
}

// process functions
export function ProcessLoginPage(req: Request, res: Response, next: NextFunction): void
{
    passport.authenticate('local', function(err, user, info)
    {
        if (err) // server errors
        {
            console.error(err);
            res.end(err);
        }

        if (!user) // login errors
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }

        req.logIn(user, function(err)
        {
            if (err) // db errors
            {
                console.error(err);
                res.end(err);
            }

            const authToken = GenerateToken(user);
            console.log(authToken);

            return res.redirect('/contact-list');
        });

    })(req, res, next);
}

export function ProcessRegisterPage(req: Request, res: Response, next: NextFunction): void
{
    let newUser = new User
    ({
        username: req.body.username,
        EmailAddress: req.body.emailAddress,
        DisplayName: req.body.firstName + " " + req.body.lastName
    });

    User.register(newUser, req.body.password, function(err)
    {
        if (err)
        {
            if (err.name == "UserExistsError")
            {
                console.error('ERROR: User Already Exists!');
                req.flash('registerMessage','Registration Error');
            }

            console.error(err.name); // other error
            req.flash('registerMessage', 'Server Error');
            return res.redirect('/register');
        }

        // log in user
        return passport.authenticate('local')(req, res, function()
        {
            return res.redirect('/contact-list');
        });
    });
}

export function ProcessLogoutPage(req: Request, res: Response, next: NextFunction): void
{
    req.logOut();

    res.redirect('/login');
}