package game

/*
	运动小球实体
*/

type Player struct {
	MapPos map[int]*Pos
}

var (
	_player *Player
)

func GetPlayer()*Player{
	if _player == nil {
		_player = &Player{
			MapPos: map[int]*Pos{},
		}
	}

	return _player
}

func (this *Player) GetAll()map[int]*Pos{
	return this.MapPos
}

func (this *Player) Save(port int, pos *Pos) {
	this.MapPos[port] = pos
	//新增后广播给其他小球客户端...
}

func (this *Player) Remove(port int) {
	delete(this.MapPos, port)

	//删掉后广播给其他小球客户端...
} 

