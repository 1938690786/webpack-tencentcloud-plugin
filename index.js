"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var COS = require('cos-nodejs-sdk-v5');
var path = require('path');
class TencentcloudPlugin {
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        const doneFn = (stats) => {
            this.upload(stats, compiler.options.output.path);
        };

        if (compiler.hooks) {
            const plugin = { name: 'TencentcloudPlugin' };
            compiler.hooks.done.tap(plugin, doneFn);
        }
        else {
            compiler.plugin('done', doneFn);
        }
    }
    upload(stats, outputPath) {
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
                FilePath: path.join(outputPath, item)
            };
        });

        const copyOption = JSON.parse(JSON.stringify(this.options));
        delete copyOption.SecretId;
        delete copyOption.SecretKey;
        console.log("正在上传资源到oss,上传配置:\n", copyOption);

        // 多文件上传
        cos.uploadFiles({
            files: filePathList,
            SliceSize: 1024 * 1024 * 10,   /* 设置大于10MB采用分块上传 */
        }, function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
            console.log(`总共${filePathList.length}个文件,上传成功${data.files.length}个文件`);
        });
    }
}
exports.default = TencentcloudPlugin;
