export default {
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'name',
            type: 'string',
            description: 'Name of category'
        },
        {
            name: 'types',
            title: 'Types',
            type: 'array',
            of: [{type: 'string'}]
        }
    ]
}