package config

import (
	"os"

	"github.com/midtrans/midtrans-go"
)

func InitMidtrans() {
	midtrans.ServerKey = os.Getenv("MIDTRANS_SERVER_KEY")
	midtrans.Environment = midtrans.Sandbox
}
