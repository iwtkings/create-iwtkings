import commandLineArgs from "command-line-args"
import commandLineUsage from "command-line-usage"
import prompts from "prompts"

import gitClone from './gitClone.js'

const optionDefinitions = [
    { name: "version", alias: "v", type: Boolean },
    { name: "help", alias: "h", type: Boolean }
];
const options = commandLineArgs(optionDefinitions)

// 版本号
if (options.version) {
    console.log("iwtkings-1111", "命令：version")
}

//帮助命令
const helpSections = [
    {
        header: 'create-iwtkings',
        content: '一个快速生成组件库搭建环境的脚手架',
    },
    {
        header: 'Options',
        optionList: [
            {
                name: 'version',
                alias: 'v',
                typeLabel: '{underline boolean}',
                description: '版本号',
            },
            {
                name: 'help',
                alias: 'h',
                typeLabel: '{underline boolean}',
                description: '帮助',
            }
        ],
    },
];

if (options.help) {
    console.log(commandLineUsage(helpSections))
}

// 交互式命令
const promptsOptions = [
    {
        type: "text",
        name: "name",
        message: "请输入项目名称",
    },
    {
        type: "select", //单选
        name: "template",
        message: "请选择项目模板",
        choices: [
            { title: "vue", value: 0 },
            { title: "react", value: 1 },
        ],
    },
];

const remoteList = {
    1: "http://10.106.11.64/my-slaughter-frontend/my_slaughter_front_business.git",
    2: "https://github.com/qddidi/easyest.git",
};

const getUserInfo = async () => {
    const res = await prompts(promptsOptions)
    console.log("iwtkings-res", res)
    if (!res.name || res.template == undefined) return;
    gitClone(`direct:${remoteList[res.template]}`, res.name, {
        clone: true,
    });
}
getUserInfo()


