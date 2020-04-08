package game

/*
	运动小球实体
*/

type Players struct {
	MapPos map[int]*Pos
}

var (
	_Players *Players
)

func GetPlayers()*Players{
	if _Players == nil {
		_Players = &Players{
			MapPos: map[int]*Pos{},
		}
	}

	return _Players
}

func (this *Players) GetAll()map[int]*Pos{
	return this.MapPos
}

func (this *Players) Save(port int, pos *Pos) {
	this.MapPos[port] = pos
	//新增后广播给其他小球客户端...
}

func (this *Players) Remove(port int) {
	delete(this.MapPos, port)

	//删掉后广播给其他小球客户端...
} 

