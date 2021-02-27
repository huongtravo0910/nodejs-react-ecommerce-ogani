import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  CATEGORY_SAVE_REQUEST,
  CATEGORY_SAVE_SUCCESS,
  CATEGORY_SAVE_FAIL,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_REQUEST,
} from "../constants/categoryContants";
import Axios from "axios";

const listCategory = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });
    const { data } = await Axios.get("http://localhost:5000/api/categories");
    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CATEGORY_LIST_FAIL, payload: error.message });
  }
};

const detailsCategory = (categoryId) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_DETAILS_REQUEST });
    const { data } = Axios.get(
      "http://localhost:5000/api/categories/" + categoryId
    );
    dispatch({ type: CATEGORY_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CATEGORY_DETAILS_FAIL, payload: error.message });
  }
};

const saveCategory = (category) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_SAVE_REQUEST, payload: category });
    if (!category._id) {
      const { data } = await Axios.post(
        "http://localhost:5000/api/categories",
        category
      );
      dispatch({ type: CATEGORY_SAVE_SUCCESS, payload: data });
    }
    const { data } = await Axios.patch(
      "http://localhost:5000/api/categories/" + category._id,
      category
    );
    dispatch({ type: CATEGORY_SAVE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CATEGORY_SAVE_FAIL, payload: error.message });
  }
};

const deleteCategory = (categoryId) => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_DELETE_REQUEST, payload: categoryId });
    const { data } = await Axios.delete(
      "http://localhost:5000/api/categories/" + categoryId
    );
    dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: CATEGORY_DELETE_FAIL, payload: error.message });
  }
};

export { listCategory, detailsCategory, deleteCategory, saveCategory };
