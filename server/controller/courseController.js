/***
 * @creater:ACBash
 * @create_time:22-11-21 0:51:41
 * @last_modify:ACBash
 * @modify_time:22-11-21 1:11:32
 * @line_count:23
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
                data: {
                    total: resTotal[0].total,
                    list: resPage
				}
			})
		})
	})
}