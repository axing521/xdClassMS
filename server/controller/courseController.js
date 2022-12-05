/***
 * @creater:ACBash
 * @create_time:22-11-21 0:51:41
 * @last_modify:ACBash
 * @modify_time:22-12-4 20:26:35
 * @line_count:69
 **/

const db = require("../config/db");

//课程查询逻辑
exports.listVideo = (req, res) => {
    let {category, page, size} = req.query;
    page = (page - 1) * size;
    let pageSql = `select * from video where del = 0 and category = ? order by id limit ?,?`;
    let totalSql = `select count(*) as total from video where del = 0 and category = ?`;
    
    db.query(pageSql, [category, Number(page), Number(size)], (err, resPage) => {
        if(err) return res.send({code: 1, message: err.message});
        db.query(totalSql, [category], (err, resTotal) => {
            if(err) return res.send({code: 1, message: err.message});
            res.send({
                code: 0,
                total: resTotal[0].total,
                list: resPage
			})
		})
	})
}

//课程修改逻辑
exports.updateVideoById = (req, res) => {
    let {title, price, id} = req.query;
    let arr = [];
    let changeSql = `update video set `;
    
    //修改标题和价格
    if(title && price){
        changeSql += `title = ?, price = ? where id = ?`;
        arr = [title, Number(price), Number(id)];
	}else if(title){
        //修改标题
        changeSql += `title = ? where id = ?`;
        arr = [title, Number(id)];
	}else if(price){
        //修改课程价格
        changeSql += `price = ? where id = ?`;
        arr = [Number(price), Number(id)];
	}
    
    db.query(changeSql, arr, (err, results) => {
        if(err) return res.send({code: 1, message: err.message});
        res.send({
            code: 0,
            data: {
                message: `修改成功！`
			}
        })
	})
}

//课程删除逻辑
exports.deleteVideoById = (req, res) => {
    let {id} = req.query;
    let deleteSql = `update video set del = 1 where id = ?`;
    
    db.query(deleteSql, id, (err, results) => {
        if(err) return res.send({code: 1, message: err.message});
        
        res.send({
            code: 0,
            data: {
                message: `删除成功`
			}
        })
	})
}