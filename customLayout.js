// deskStructure.js
import S from '@sanity/desk-tool/structure-builder'

export default () =>
    S.list()
        .title('Content')
        .items([
            // List out all the document types in schema.js
            ...S.documentTypeListItems(),
            // Add a new list item for projects by category
            S.listItem()
                .title('Projects by category')
                .child(
                    // List out all categories
                    S.documentTypeList('category')
                        .title('Projects by category')
                        .child(catId =>
                            // List out project documents where the _id for the selected
                            // category appear as a _ref in the project’s categories array
                            S.documentList()
                                .schemaType('movie')
                                .title('Projects')
                                .filter(
                                    '_type == "movie" && $catId in categories[]._ref'
                                )
                                .params({ catId })
                        )
                ),
        ])