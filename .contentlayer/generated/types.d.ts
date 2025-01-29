// NOTE This file is auto-generated by Contentlayer

import type { Markdown, MDX, ImageFieldData, IsoDateTimeString } from 'contentlayer2/core'
import * as Local from 'contentlayer2/source-files'

export { isType } from 'contentlayer2/client'

export type { Markdown, MDX, ImageFieldData, IsoDateTimeString }

/** Document types */
export type Page = {
  /** File path relative to `contentDirPath` */
  _id: string
  _raw: Local.RawDocumentData
  type: 'Page'
  /** The title of the post */
  title: string
  /** The date of the post */
  date: IsoDateTimeString
  description?: string | undefined
  published: boolean
  summary?: string | undefined
  links?: LinksProperties | undefined
  featured: boolean
  component: boolean
  toc: boolean
  /** MDX file body */
  body: MDX
  slug: string
  slugAsParams: string
  url: string
}  

/** Nested types */
export type LinksProperties = {
  /** File path relative to `contentDirPath` */
  _id: string
  _raw: Local.RawDocumentData
  type: 'LinksProperties'
  doc?: string | undefined
  api?: string | undefined

}  

/** Helper types */

export type AllTypes = DocumentTypes | NestedTypes
export type AllTypeNames = DocumentTypeNames | NestedTypeNames

export type DocumentTypes = Page
export type DocumentTypeNames = 'Page'

export type NestedTypes = LinksProperties
export type NestedTypeNames = 'LinksProperties'

export type DataExports = {
  allDocuments: DocumentTypes[]
  allPages: Page[]
}


export interface ContentlayerGenTypes {
  documentTypes: DocumentTypes
  documentTypeMap: DocumentTypeMap
  documentTypeNames: DocumentTypeNames
  nestedTypes: NestedTypes
  nestedTypeMap: NestedTypeMap
  nestedTypeNames: NestedTypeNames
  allTypeNames: AllTypeNames
  dataExports: DataExports
}

declare global {
  interface ContentlayerGen extends ContentlayerGenTypes {}
}

export type DocumentTypeMap = {
  Page: Page
}

export type NestedTypeMap = {
  LinksProperties: LinksProperties
}

 