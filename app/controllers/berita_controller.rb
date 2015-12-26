class BeritaController < ApplicationController
  before_action :set_beritum, only: [:show, :edit, :update, :destroy]

  # GET /berita
  # GET /berita.json
  def index
    @berita = Beritum.all
  end

  # GET /berita/1
  # GET /berita/1.json
  def show
  end

  # GET /berita/new
  def new
    @beritum = Beritum.new
  end

  # GET /berita/1/edit
  def edit
  end

  # POST /berita
  # POST /berita.json
  def create
    @beritum = Beritum.new(beritum_params)

    respond_to do |format|
      if @beritum.save
        format.html { redirect_to @beritum, notice: 'Beritum was successfully created.' }
        format.json { render :show, status: :created, location: @beritum }
      else
        format.html { render :new }
        format.json { render json: @beritum.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /berita/1
  # PATCH/PUT /berita/1.json
  def update
    respond_to do |format|
      if @beritum.update(beritum_params)
        format.html { redirect_to @beritum, notice: 'Beritum was successfully updated.' }
        format.json { render :show, status: :ok, location: @beritum }
      else
        format.html { render :edit }
        format.json { render json: @beritum.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /berita/1
  # DELETE /berita/1.json
  def destroy
    @beritum.destroy
    respond_to do |format|
      format.html { redirect_to berita_url, notice: 'Beritum was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_beritum
      @beritum = Beritum.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def beritum_params
      params.require(:beritum).permit(:judul, :isi)
    end
end
