function getPesan(pesan,cont,isi){
	cont.fadeIn(3000);
	pesan.text(isi);
	cont.fadeOut(1000);
}
$(function (){

	var $berita = $('#berita');
	var $judul = $('#judul');
	var $isi = $('#isi');
	var $kosong = $('#kosong');
	var $tambah = $('#add-berita');
	var $simpan = $('#simpan');
	var $pesan = $('#pesan');
	var $cont = $('#cont-pesan');

	// pengambilan datanya
	$.ajax({
		type: 'GET',
		url: '/berita.json',
		success: function(beritanya){
			$.each(beritanya, function(i, berita){
				$berita.append(
					'<li class="collection-item '+berita.id+'"><div>Judul: <span class="judul'+berita.id+'">'+berita.judul+'</span>, Isi: <span class="isi'+berita.id+'">'+berita.isi+'</span><span class="secondary-content"><button data-id="'+berita.id+'" class="editButton">Edit</button><button data-id="'+berita.id+'" class="remove">x</button></span></div></li>'
				);
			});
			if (beritanya == ""){
				$kosong.text('Belum ada Berita');
			}
		},
		error: function(){
			alert("Beritanya Nggak ke Load Kakak :v")
		}
	});

	// post data ke database
	$tambah.on('click', function(){

		var datanya = {
			beritum:{
			judul: $judul.val(),
			isi: $isi.val()}
		};

		if($judul.val() !== "" && $isi.val() !== ""){

			$.ajax({
				type: 'POST',
				url: '/berita.json',
				data: datanya,
				success: function(berita){
					$berita.append('<li class="collection-item '+berita.id+'"><div>Judul: <span class="judul'+berita.id+'">'+berita.judul+'</span>, Isi: <span class="isi'+berita.id+'">'+berita.isi+'</span><span class="secondary-content"><button data-id="'+berita.id+'" class="editButton">Edit</button><button data-id="'+berita.id+'" class="remove">x</button></span></div></li>');
					$judul.val("");
					$isi.val("");
					$judul.focus();
					$kosong.text("");
					// alert("Sukses, silahkan menambah data lagi jika memang perlu");
					getPesan($pesan,$cont,"Data Telah Ditambah");
				},
				error: function(error){
					alert('Tambah Berita Erorr :v');
				}
			});

		}else{
			getPesan($pesan,$cont,"Isi Semua Field Terlebih Dahulu");
		}
	});

	// delete data
	$berita.delegate('.remove','click', function(){

		var $li =  $(this).closest('li');

		$.ajax({
			type: 'DELETE',
			url: '/berita/'+ $(this).attr('data-id') +'.json',
			success: function(){
				$li.fadeOut(300, function(){
					$(this).remove();
				});
			},
			error: function(){
				alert("Terjadi kesalahan saat DELETE");
			}
		});

	});

	//edit data
	$berita.delegate('.editButton','click', function(){

		var $li = $(this).closest('li');
		var $id = $(this).attr('data-id');

		$judul.val($li.find('span.judul'+ $id).html());
		$isi.val($li.find('span.isi'+ $id).html());
		$tambah.addClass("edit");
		$simpan.removeClass("edit");
		$('.remove').addClass('edit');

		$simpan.on('click', function(){

			var datanya = {
				beritum:{
					judul: $judul.val(),
					isi: $isi.val()}
			};

			if($judul.val() !== "" && $isi.val() !== ""){
				$.ajax({
					type: 'PUT',
					url: '/berita/'+ $id +'.json',
					data: datanya,
					success: function(beritanya){
						$('.judul'+ $id).html(beritanya.judul);
						$('.isi'+ $id).html(beritanya.isi);
						$simpan.addClass("edit");
						$tambah.removeClass("edit");
						$judul.val("");
						$isi.val("");
						$id = "";
						$('.remove').removeClass('edit');
						getPesan($pesan,$cont,"Data Berhasil Di Perbarui");
					}
				});

			}else{
				getPesan($pesan,$cont,"Isi Semua Field Terlebih Dahulu");
			}
		});

	});

});
