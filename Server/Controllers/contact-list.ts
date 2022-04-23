/*
 * Cody Chaplin - 100557080
 * Logan Morris - 100795796
 * 22/04/2022
 */

import express, {Request, Response, NextFunction} from 'express';

import Contact from '../Models/contact';
import { UserDisplayName } from '../Util/index';

/****************** CONTACT-LIST ROUTES ********************/

// display functions
export function DisplayContactListPage(req: Request, res: Response, next: NextFunction):void
{
    Contact.find(function(err, contactsCollection)
    {
        if (err)
        {
            console.error(err);
            res.end(err);
        }

        res.render('index', { title: 'Contact List', page: 'contact-list',
            contacts: contactsCollection, displayName: UserDisplayName(req) });
    });
}

export function DisplayAddPage(req: Request, res: Response, next: NextFunction):void
{
    res.render('index', { title: 'Add New Contact', page: 'update', contact: '',
        displayName: UserDisplayName(req) });
}

export function DisplayEditPage(req: Request, res: Response, next: NextFunction):void
{
    let id = req.params.id;

    //pass ID to db and read contact in
    Contact.findById(id, {}, {}, function(err, contactToEdit)
    {
        if (err)
        {
            console.error(err);
            res.end(err);
        }

        // show edit view with data
        res.render('index', { title: 'Edit Contact', page: 'update',
            contact: contactToEdit, displayName: UserDisplayName(req) });
    });

}

// process functions
export function ProcessAddPage(req: Request, res: Response, next: NextFunction):void
{
    // instantiate new Contact
    let newContact = new Contact
    ({
        "FullName": req.body.fullName,
        "ContactNumber": req.body.contactNumber,
        "EmailAddress": req.body.emailAddress
    });

    // insert contact into db
    Contact.create(newContact, function(err)
    {
        if (err)
        {
            console.error(err);
            res.end(err);
        }

        // newContact added successfully, redirect to contact-list
        res.redirect('/contact-list');
    });
}

export function ProcessDeletePage(req: Request, res: Response, next: NextFunction):void
{
    let id = req.params.id;

    //pass ID to db and delete contact
    Contact.remove({_id: id}, function(err)
    {
        if (err)
        {
            console.error(err);
            res.end(err);
        }

        // delete successful
        res.redirect('/contact-list');
    });
}

export function ProcessEditPage(req: Request, res: Response, next: NextFunction):void
{
    let id = req.params.id;

    // instantiate new Contact
    let updatedContact = new Contact
    ({
        "_id": id,
        "FullName": req.body.fullName,
        "ContactNumber": req.body.contactNumber,
        "EmailAddress": req.body.emailAddress
    });

    // db.contacts.update
    Contact.updateOne({_id: id}, updatedContact, function(err: ErrorCallback)
    {
        if (err)
        {
            console.error(err);
            res.end(err);
        }
        
        res.redirect('/contact-list');
    });

}