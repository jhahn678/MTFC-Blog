import * as CFRichTextTypes from "@contentful/rich-text-types";
import * as Contentful from "contentful";

export interface TypeAuthorFields {
    displayName: Contentful.EntryFields.Symbol;
    slug: Contentful.EntryFields.Symbol;
    bio?: Contentful.EntryFields.Text;
    avatar: Contentful.Asset;
    location?: Contentful.EntryFields.Symbol;
    posts?: Contentful.Entry<Record<string, any>>[];
}

export type TypeAuthor = Contentful.Entry<TypeAuthorFields>;

export interface TypeCategoryFields {
    title?: Contentful.EntryFields.Symbol;
    slug?: Contentful.EntryFields.Symbol;
    thumbnail?: Contentful.Asset;
    description?: Contentful.EntryFields.Text;
}

export type TypeCategory = Contentful.Entry<TypeCategoryFields>;

export interface TypeCommentFields {
    user?: Contentful.Entry<Record<string, any>>;
    body?: Contentful.EntryFields.Text;
    replies?: Contentful.Entry<Record<string, any>>[];
    createdAt?: Contentful.EntryFields.Date;
}

export type TypeComment = Contentful.Entry<TypeCommentFields>;

export interface TypePostFields {
    title?: Contentful.EntryFields.Symbol;
    slug?: Contentful.EntryFields.Symbol;
    thumbnail?: Contentful.Asset;
    body?: CFRichTextTypes.Block | CFRichTextTypes.Inline;
    author?: Contentful.Entry<Record<string, any>>;
    createdAt?: Contentful.EntryFields.Date;
    comments?: Contentful.Entry<Record<string, any>>[];
    tags?: Contentful.EntryFields.Symbol[];
    category?: Contentful.Entry<Record<string, any>>;
}

export type TypePost = Contentful.Entry<TypePostFields>;

export interface TypeUserFields {
    name?: Contentful.EntryFields.Symbol;
    email?: Contentful.EntryFields.Symbol;
    password?: Contentful.EntryFields.Symbol;
    avatar?: Contentful.Asset;
    createdAt?: Contentful.EntryFields.Date;
    comments?: Contentful.Entry<Record<string, any>>[];
    following?: Contentful.Entry<Record<string, any>>[];
}

export type TypeUser = Contentful.Entry<TypeUserFields>;