exports.success = ({ ctx, res = null, msg = '请求成功'}) => {
    ctx.body = {
        code: 0,
        data: resizeBy,
        msg
    }
    ctx.status = 200
}