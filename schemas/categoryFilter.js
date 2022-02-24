export default {
    name: 'categoryFilter',
    title: 'CategoryFilter',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'categories',
            title: 'Categories',
            type: 'array',
            of: [{
                type: 'reference',
                to: [{
                    type: 'category'
                }]
            }]
        }
    ]
}