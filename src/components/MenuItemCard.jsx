function MenuItemCard() {
 const item = {
 name: 'Chicken & Waffles',
 description: '2pcs of bone in fried chicken OR 5pcs of tenders, buttermilk waffles, Fowl Jam and maple syrup',
 price: 35,
 available: true,
 }
 return (
 <article className="card menu-card">
 <div className="thumb" aria-hidden="true">{item.name.charAt(0)}</div>
 <h3>{item.name}</h3    >
 <p className="muted">{item.description}</p>
 <p className="price">RM {item.price.toFixed(2)}</p>
 <button className="btn" disabled={!item.available}>
 {item.available ? 'Add to cart' : 'Sold out'}
 </button>
 </article>
 )
}
export default MenuItemCard