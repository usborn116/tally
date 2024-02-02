export const form_object = (item, info, data) => {
    categories = {}
    if(item == 'game'){
        const entries = Object.keys(data).filter(key => key.startsWith('categories_attributes'))
        console.log('entries', entries)
        entries.forEach(k => {
            let id = Number(k.split(';')[1])
            let attr = k.split(';')[2]
            console.log('id', id)
            console.log('attr', attr)
            if (attr=='name'){
                categories[id] ? categories[id]['name'] = data[k] : categories[id] = {name: data[k], point_based: false }
            } else if (attr == 'points') {
                categories[id]['point_based'] = true
            }
        })
    }

    if(item == 'game'){info[item] = { name: data.name, game_category: data.game_category, image: data.image, 
        gameplay_length: data.gameplay_length, player_number: data.player_number, complexity: data.complexity, 
        categories_attributes: categories
    }}
    if(item == 'category'){info[item] = { name: data.name, point_based: data.point_based || false, game_id: data.game_id}}
    if(item == 'player' || item == 'session_player'){info[item] = { name: data.name, session_id: data.session_id }}
    if(item == 'session'){info[item] = { date: data.date, game_id: data.game_id, user_id: data.user_id }} 
    if(item == 'session_score'){info[item] = { amount: data.amount, session_id: data.session_id, 
        session_category_id: data.session_category_id, session_player_id: data.session_player_id, win: data.win || false}} 
    if(item == 'login'){info['user'] = { email: data.email, password: data.password }}
    if(item == 'signup'){info['user'] = { name: data.name, email: data.email, 
        password: data.password, password_confirmation: data.password_confirmation }}
    if(item == 'games'){info[item] = { name: data.name }}
    if(item == 'create_share'){info[item] = { email: data.email }}
    return info
}