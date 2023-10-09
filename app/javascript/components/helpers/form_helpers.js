export const form_object = (item, info, data) => {
    if(item == 'game'){info[item] = { name: data.name, game_category: data.game_category, image: data.image, 
        gameplay_length: data.gameplay_length, player_number: data.player_number, complexity: data.complexity, 
        category_count: data.category_count}}
    if(item == 'category'){info[item] = { name: data.name, point_based: data.point_based || false, game_id: data.game_id}}
    if(item == 'player' || item == 'session_player'){info[item] = { name: data.name, session_id: data.session_id }}
    if(item == 'session'){info[item] = { date: data.date, game_id: data.game_id }} 
    if(item == 'session_score'){info[item] = { amount: data.amount, session_id: data.session_id, 
        session_category_id: data.session_category_id, session_player_id: data.session_player_id }} 
    if(item == 'login'){info['user'] = { email: data.email, password: data.password }}
    if(item == 'signup'){info['user'] = { name: data.name, email: data.email, 
        password: data.password, password_confirmation: data.password_confirmation }}
    return info
}