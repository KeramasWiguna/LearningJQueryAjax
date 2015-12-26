require 'test_helper'

class BeritaControllerTest < ActionController::TestCase
  setup do
    @beritum = berita(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:berita)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create beritum" do
    assert_difference('Beritum.count') do
      post :create, beritum: { isi: @beritum.isi, judul: @beritum.judul }
    end

    assert_redirected_to beritum_path(assigns(:beritum))
  end

  test "should show beritum" do
    get :show, id: @beritum
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @beritum
    assert_response :success
  end

  test "should update beritum" do
    patch :update, id: @beritum, beritum: { isi: @beritum.isi, judul: @beritum.judul }
    assert_redirected_to beritum_path(assigns(:beritum))
  end

  test "should destroy beritum" do
    assert_difference('Beritum.count', -1) do
      delete :destroy, id: @beritum
    end

    assert_redirected_to berita_path
  end
end
