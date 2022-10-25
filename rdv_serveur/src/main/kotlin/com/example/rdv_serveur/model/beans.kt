package com.example.rdv_serveur.model

import java.util.*
import kotlin.collections.ArrayList


//beans bdd

data class UserBean(
    var user_key:Int,
    var user_pseudo:String,
    var user_password:String,
    var user_mail:String,
)

data class UserTypeBean(
    var user_type_key:Int,
    var user_type_name:String
)

data class HaveTypeBean(
    var user_type_key:Int,
    var user_key:Int,
)


data class FilmBean(
    var film_key:Int,
    var film_title:String,
    var film_released_date: String,
    var film_description:String,
    var film_img:String,
    var film_trailer:String,
    var film_display_on: Date,
    var film_director: String,
    var film_actors: String,
    var film_country: String,

)





// beans appel api themoviedatabase
