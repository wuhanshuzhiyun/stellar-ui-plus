export interface ResponseData {
    id: number;
    createUser: number;
    createDept: number;
    createTime: string;
    updateUser: number;
    updateTime: string;
    status: number;
    isDeleted: number;
    tenantId: string;
    /** 应用id(关联inte_client表id字段) */
    inteClientId: number;
    /** 版本号 */
    code: string;
    /** 版本名称 */
    name: string;
    /** 版本说明 */
    desc: string;
    /** 版本更新内容 */
    content: string;
    /** 版本更新文件地址 */
    updateFile: string;
    /** 版本完整文件地址 */
    entireFile: string;
    /** 是否当前版本 */
    isCurrent: true;
    /** 是否强制更新 */
    isForce: true;
    /** 发布状态 TO_RELEASE待发布、RELEASED已发布 */
    publishStatus: 'TO_RELEASE' | 'RELEASED';
    createUserName: string;
    updateUserName: string;
    createDeptName: string;
}

export interface ClientData {
    /** 版本更新内容 */
    content: string;
    /** 版本更新文件地址 */
    updateFile: string;
    /** 是否强制更新 */
    isForce: boolean;
    /** 0 是整包升级 1是wgt升级 */
    package_type: number;
    /** 版本名称 */
    name: string;
    /** 版本号 */
    code: string;
}

export function download(
    data: ClientData,
    {
        success,
        error,
        onProgressUpdate,
        downloadSuccess,
    }: { success?: () => void; error?: (e: any) => void; downloadSuccess?: (tempFilePath: string) => void; onProgressUpdate?: (res: UniApp.OnProgressDownloadResult) => void }
) {
    const package_type = data.package_type;
    const downloadTask = uni.downloadFile({
        url: data.updateFile,
        success: res => {
            if (res.statusCode === 200) {
                downloadSuccess && downloadSuccess(res.tempFilePath);
                plus.runtime.install(
                    res.tempFilePath,
                    { force: true },
                    () => {
                        // wgt升级
                        if (package_type == 1) {
                            uni.showModal({
                                title: '提示',
                                content: '升级成功，请重新启动！',
                                confirmText: '确定',
                                showCancel: false,
                                success: () => {
                                    success && success();
                                    plus.runtime.restart();
                                },
                            });
                        }
                    },
                    e => {
                        //提示部分wgt包无法安装的问题
                        uni.showModal({
                            title: '提示',
                            content: e.message,
                            showCancel: false,
                            success: () => {
                                error && error(e);
                            },
                        });
                    }
                );
                // 整包升级
                if (package_type == 0) {
                    // 解决安装app点击取消，更新还在的问题
                    success && success();
                }
            }
        },
    });
    // 下载进度
    downloadTask.onProgressUpdate(res => {
        onProgressUpdate && onProgressUpdate(res);
    });
}
