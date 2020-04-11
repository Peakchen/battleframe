package game

//坐标符号
const (
	Pos_Right = uint16(1)
	Pos_Left = uint16(2)
)

//坐标结构体
type Pos struct {
	Nodex int
	Nodey int
}

const (
	maxWidth = 960
)

//游戏状态
type MosterState int
const (
	MosterState_Online MosterState = 1 //在线
	MosterState_Offline MosterState = 2 //下线
)