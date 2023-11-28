const authenticateToken = require("../middlewares/authenticateToken");

const router = require("express").Router();
const items = [];
let reqCount=0;

let isLimited = false;


router.get("/", async (request, response) => {
  reqCount++
  if (reqCount > 5) {
    isLimited=true;

    if (isLimited) {
      setTimeout(() => {
        isLimited=false
        reqCount=0
        
      }, 30000);
    }

    return response.status(429).json({ error: "You are being limited."});
    
  }

  return response.status(200).json({ data: items});
});



router.get("/:id", authenticateToken, async (request, response) => {
  reqCount++
  if (reqCount > 5) {
    isLimited=true;

    if (isLimited) {
      setTimeout(() => {
        isLimited=false
        reqCount=0
      }, 30000);
    }

    return response.status(429).json({ error: "You are being limited."});
    
  }
    const foundItem = items.find((obj) => obj.id == Number(request.params.id));

    if (!foundItem) {
        return response.status(404).json({message: "Item not found"});
    }
    return response.status(200).json({data: foundItem});
})

router.post("/", authenticateToken, async (request, response) => {
  reqCount++
  if (reqCount > 10) {
    isLimited=true;

    if (isLimited) {
      setTimeout(() => {
        isLimited=false
        reqCount=0
      }, 30000);
    }

    return response.status(429).json({ error: "You are being limited."});
    
  }
    const obj = {
        id: items.length+1,
        name: request.body.name
    };

    items.push(obj);
    return response.status(201).json({message: "Succesfully added new item."})
})

router.put("/:id", authenticateToken, async (request, response) => {
  reqCount++
  if (reqCount > 10) {
    isLimited=true;

    if (isLimited) {
      setTimeout(() => {
        isLimited=false
        reqCount=0
      }, 30000);
    }

    return response.status(429).json({ error: "You are being limited."});
    
  }
    const itemId = Number(request.params.id);
    const updatedName = request.body.name;
  
    const itemIndex = items.findIndex((obj) => obj.id === itemId);
  
    if (itemIndex === -1) {
      return response.status(404).json({ message: "Item not found" });
    }
  
    items[itemIndex].name = updatedName;
  
    return response.status(200).json({ message: "Item updated successfully"});
  });
  
router.delete("/:id", authenticateToken, async (request, response) => {
  reqCount++
  if (reqCount > 5) {
    isLimited=true;

    if (isLimited) {
      setTimeout(() => {
        isLimited=false
        reqCount=0
      }, 5000);
    }

    return response.status(429).json({ error: "You are being limited."});
    
  }
    const itemId = Number(request.params.id);
  
    const itemIndex = items.findIndex((obj) => obj.id === itemId);
  
    if (itemIndex === -1) {
      return response.status(404).json({ message: "Item not found" });
    }
  
    items.splice(itemIndex, 1);
  
    return response.status(200).json({ message: "Item deleted successfully"});
  });

module.exports = router;

