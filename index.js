$.ajax({
    url:"https://pokeapi.co/api/v2/pokemon/"
}).done((result)=>{
    test = "";
    $.each(result.results,function(key,val){
        test += `<tr>
                    <td>${key+1}</td>
                    <td>
                    <img class="img-chara" width="80" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                        key + 1
                      }.png">
                        ${val.name}
                    </td>
                    
                    <td><button class="btn btn-primary" onclick="detailChara('${val.url}')" data-bs-toggle="modal" data-bs-target="#modalDetailSW">Detail</button></td>
                </tr>`;
    })
    $("#tbodySW").html(test);
}).fail((error)=>{
    console.log(error);
})

function detailChara(stringURL){
    $.ajax({
        url: stringURL
    }).done((result)=>{
        title = result.species.name;
        $("#exampleModalLabel").text(title);

        baseExper = result.base_experience;
        $("#baseExp").text(baseExper);

        w = result.weight;
        $("#weight").text(w);

        h = result.height;
        $("#height").text(h);
        
        image =result.sprites.other.dream_world.front_default;
        $("#img-chara").attr("src",image);
        
        tipe=""
        $.each(result.types,function(key, val){
            tipe += `<span class="badge bg-primary w-25 h-100 text-lg-primary mx-2 fs-3">${val.type.name}</span>`;
        })
        $("#tipeChara").html(tipe);
        
        addStats =""
        $.each(result.stats,function(key, val){
            addStats += `
            ${val.stat.name}
            <div class="progress mt-2">
                <div class="progress-bar progress-bar-striped bg-success" role="progressbar"
                    style="width: ${val.base_stat}%" aria-valuenow="" aria-valuemin="0" aria-valuemax="60">
                ${val.base_stat}
                </div>
            </div>`
        })
        $("#add-stats").html(addStats);
        
        abil =""
        $.each(result.abilities, function (key, val) {
            abil += 
            `<li class="nav-item">
                <button class="btn btn-primary mx-4 mt-5"  data-bs-toggle="modal" data-bs-target="#ModalBaru" onclick="detailAbility(${val.ability.url})">
                ${val.ability.name}
                </button>
            </li>`;
        })
        $("#ability-list").html(abil);

        

    }).fail((error)=>{
        console.log(error);
    })
}

function detailAbility(stringURL){
    $.ajax({
        url: stringURL
    }).done((result)=>{
        effecte =""
        $.each(result.effect_entries, function (key, val) {
            effecte += `
                <h2>Bahasa : ${key.language.name}</h2>
                <p>${val.effect}</p>
            `;
        })
        $("#isiAbility").html(effecte);

        

    }).fail((error)=>{
        console.log(error);
    })
}