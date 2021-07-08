package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Account struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name     string             `json:"userName,omitempty" bson:"userName,omitempty"`
	Score    int                `json:"userScore,omitempty" bson:"userScore,omitempty"`
	CreateAt string             `json:"userCreateAt,omitempty" bson:"userCreateAt,omitempty"`
}
