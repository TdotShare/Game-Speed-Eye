package controllers

import (
	"context"
	"fmt"
	"log"
	"server/config"
	"server/models"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// func GetAllAccount(c *fiber.Ctx) error {
// 	accountCollection := config.MI.DB.Collection("account")
// 	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

// 	var account []models.Account

// 	filter := bson.M{}
// 	findOptions := options.Find()

// 	if s := c.Query("s"); s != "" {
// 		filter = bson.M{
// 			"$or": []bson.M{
// 				{
// 					"movieName": bson.M{
// 						"$regex": primitive.Regex{
// 							Pattern: s,
// 							Options: "i",
// 						},
// 					},
// 				},
// 				{
// 					"catchphrase": bson.M{
// 						"$regex": primitive.Regex{
// 							Pattern: s,
// 							Options: "i",
// 						},
// 					},
// 				},
// 			},
// 		}
// 	}

// 	page, _ := strconv.Atoi(c.Query("page", "1"))
// 	limitVal, _ := strconv.Atoi(c.Query("limit", "10"))
// 	var limit int64 = int64(limitVal)

// 	total, _ := accountCollection.CountDocuments(ctx, filter)

// 	findOptions.SetSkip((int64(page) - 1) * limit)
// 	findOptions.SetLimit(limit)

// 	cursor, err := accountCollection.Find(ctx, filter, findOptions)
// 	defer cursor.Close(ctx)

// 	if err != nil {
// 		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
// 			"success": false,
// 			"message": "Account Not found",
// 			"error":   err,
// 		})
// 	}

// 	for cursor.Next(ctx) {
// 		var catchphrase models.Account
// 		cursor.Decode(&catchphrase)
// 		account = append(account, catchphrase)
// 	}

// 	last := math.Ceil(float64(total / limit))
// 	if last < 1 && total > 0 {
// 		last = 1
// 	}

// 	return c.Status(fiber.StatusOK).JSON(fiber.Map{
// 		"data":      account,
// 		"total":     total,
// 		"page":      page,
// 		"last_page": last,
// 		"limit":     limit,
// 	})
// }

func GetScoresPlayer(c *fiber.Ctx) error {

	accountCollection := config.MI.DB.Collection("account")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	var account []models.Account

	findOptions := options.Find()
	findOptions.SetSort(map[string]int{"userScore": -1})
	findOptions.SetLimit(6)

	total, _ := accountCollection.CountDocuments(ctx, bson.M{})

	cursor, err := accountCollection.Find(ctx, bson.M{}, findOptions)

	defer cursor.Close(ctx)

	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"success": false,
			"message": "Account Not found",
			"error":   err,
		})
	}

	for cursor.Next(ctx) {
		var accountData models.Account
		cursor.Decode(&accountData)
		account = append(account, accountData)
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"data":  account,
		"count": total,
	})

}

func AddAccount(c *fiber.Ctx) error {
	accountCollection := config.MI.DB.Collection("account")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	account := new(models.Account)

	if err := c.BodyParser(account); err != nil {
		log.Println(err)
		return c.Status(400).JSON(fiber.Map{
			"success": false,
			"message": "Failed to parse body",
			"error":   err,
		})
	}

	t := time.Now()
	formatted := fmt.Sprintf("%d-%02d-%02d %02d:%02d:%02d", t.Year(), t.Month(), t.Day(), t.Hour(), t.Minute(), t.Second())
	account.CreateAt = formatted

	result, err := accountCollection.InsertOne(ctx, account)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"success": false,
			"message": "Account failed to insert",
			"error":   err,
		})
	}
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"data":    result,
		"success": true,
		"message": "Account inserted successfully",
	})
}
