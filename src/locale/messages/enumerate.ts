/**应用状态**/
const CLIENT_SERVICE = {
    cn: [
        { label: '激活', recover: '未激活', value: 'inactivated' },
        { label: '激活', recover: '已激活', value: 'activated' },
        { label: '禁用', recover: '已禁用', value: 'disable' },
        { label: '删除', recover: '已删除', value: 'delete' }
    ],
    en: [
        { label: '激活', recover: '未激活', value: 'inactivated' },
        { label: '激活', recover: '已激活', value: 'activated' },
        { label: '禁用', recover: '已禁用', value: 'disable' },
        { label: '删除', recover: '已删除', value: 'delete' }
    ]
}

export const enumerate = {
    cn: {
        CLIENT_SERVICE: CLIENT_SERVICE.cn
    },
    en: {
        CLIENT_SERVICE: CLIENT_SERVICE.en
    }
}
