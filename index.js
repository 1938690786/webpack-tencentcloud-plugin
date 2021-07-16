"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var COS = require('cos-nodejs-sdk-v5');

class TencentcloudPlugin {
    constructor(options) {
        this.options = options
    }
    apply(compiler) {
        const doneFn = (stats) => {
            this.upload(stats);
        };
        if (compiler.hooks) {
            const plugin = { name: 'TencentcloudPlugin' };
            compiler.hooks.done.tap(plugin, doneFn);
        }
        else {
            compiler.plugin('done', doneFn);
        }
    }
    upload(stats) {
        if (stats.hasErrors()) {
            console.warn('TencentcloudPlugin: 编译出错，暂停上传');
            return;
        }
        var cos = new COS({
            SecretId: this.options.SecretId,
            SecretKey: this.options.SecretKey
        });
        var filePathList = Object.keys(stats.compilation.assets).map((item) => {
            return {
                Bucket: this.options.Bucket,
                Region: this.options.Region,
                Key: `${this.options.bucketName}/${this.options.remoteDir}/${item}`,
                FilePath: `${this.options.localDir}/${item}`
            }
        })
        setTimeout(() => {
            const copyOption = JSON.parse(JSON.stringify(this.options));
            console.log("正在上传资源到oss,上传配置:\n", copyOption);
        }, 0);
        // 多文件上传
        cos.uploadFiles({
            files: filePathList,
            SliceSize: 1024 * 1024 * 10   /* 设置大于10MB采用分块上传 */
        }, function (err, data) {
            err && console.log(err)
        });
    }
}
exports.default = TencentcloudPlugin;
