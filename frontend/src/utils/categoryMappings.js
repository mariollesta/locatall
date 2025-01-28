import { Croissant, Coffee, Utensils, Beer, Truck, Pizza, Clapperboard, Amphora, PawPrint, Volleyball, ShoppingCart, Shirt, Store, BookOpen, MonitorSmartphone} from "lucide-react";

export const CATEGORY_MAPPINGS = {
  food: {
    label: "comida",
    placeTypes: [
      { value: "cafe", label: "Cafeterías", icon: Coffee },
      { value: "bakery", label: "Panaderías", icon: Croissant },
      { value: "restaurant", label: "Restaurantes", icon: Utensils },
      { value: "bar", label: "Bares", icon: Beer },
      { value: "meal_delivery", label: "Entrega a domicilio", icon: Truck },
      { value: "meal_takeaway", label: "Para llevar", icon: Pizza },
    ],
  },
  entertainment: {
    label: "entretenimiento",
    placeTypes: [
      { value: "movie_theater", label: "Cines", icon: Clapperboard },
      { value: "museum", label: "Museos", icon: Amphora },
      { value: "zoo", label: "Zoológicos", icon: PawPrint },
      { value: "stadium", label: "Estadios", icon: Volleyball },
    ],
  },
  shopping: {
    label: "compras",
    placeTypes: [
      { value: "shopping_mall", label: "Centros comerciales", icon: ShoppingCart },
      { value: "clothing_store", label: "Tiendas de ropa", icon: Shirt },
      { value: "supermarket", label: "Supermercados", icon: Store },
      { value: "book_store", label: "Librerías", icon: BookOpen },
      { value: "electronics_store", label: "Electrónica", icon: MonitorSmartphone },
    ],
  },
  // Otras categorías...
};
