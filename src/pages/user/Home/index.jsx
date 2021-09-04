import { useState, useEffect } from "react";
import { Space, Row, Col, Card, Tag, Input, Button, Slider, Checkbox } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

import { PRODUCT_LIMIT } from '../../../constants/product';

import {
  getProductListAction,
  getCategoryListAction,
} from '../../../redux/actions';

function HomePage() {
  const [categoriesSelected, setCategoriesSelect] = useState([]);
  console.log('🚀 ~ file: index.jsx ~ line 16 ~ HomePage ~ categoriesSelected', categoriesSelected);
  const [priceRange, setPriceRange] = useState([0, 30000000]);
  const [searchKey, setSearchKey] = useState('');

  const { productList } = useSelector((state) => state.productReducer);
  const { categoryList } = useSelector((state) => state.categoryReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryListAction());
    dispatch(getProductListAction({ page: 1 }));
  }, []);

  function handleFilterCategory(value) {
    setCategoriesSelect(value);
    dispatch(getProductListAction({
      page: 1,
      categoriesSelected: value,
      priceRange,
      searchKey,
    }));
  }

  function handleRangePrice(value) {
    setPriceRange(value);
    dispatch(getProductListAction({
      page: 1,
      categoriesSelected,
      priceRange,
      searchKey,
    }));
  }

  function handleSearchProduct(value) {
    setSearchKey(value);
    dispatch(getProductListAction({
      page: 1,
      categoriesSelected,
      priceRange,
      searchKey: value,
    }));
  }

  function handleShowMore() {
    dispatch(getProductListAction({
      page: productList.page + 1,
      searchKey: searchKey,
      categoriesSelected,
      priceRange,
      more: true,
    }));
  }

  function renderCategoryFilter() {
    if (
      categoriesSelected.length === 0
      && !searchKey
      && priceRange[0] === 0
      && priceRange[1] === 30000000
    ) return null;
    return (
      <Space wrap style={{ marginBottom: 16 }}>
        Đang filter theo:
        {categoriesSelected.length > 0 && categoriesSelected.map((selectedItem, selectedIndex) => {
          const categorySelectedData = categoryList.data.find((categoryItem) => 
            categoryItem.id === selectedItem
          );
          return (
            <Tag
              key={`category-${selectedIndex}`}
              closable
              onClose={(e) => {
                e.preventDefault();
                const newCategoriesSelect = [...categoriesSelected];
                newCategoriesSelect.splice(selectedIndex, 1);
                setCategoriesSelect(newCategoriesSelect);
                dispatch(getProductListAction({
                  page: 1,
                  categoriesSelected: newCategoriesSelect,
                  priceRange,
                  searchKey: searchKey
                }));
              }}>
              {categorySelectedData.name}
            </Tag>
          );
        })}
        {searchKey && (
          <Tag
            closable
            onClose={() => {
              setSearchKey('');
              dispatch(getProductListAction({
                page: 1,
                categoriesSelected,
                priceRange,
                searchKey: undefined,
              }));
            }}>
            {`Tìm theo từ khóa: ${searchKey}`}
          </Tag>
        )}
        {(priceRange[0] !== 0 || priceRange[1] !== 30000000) && (
          <Tag
            closable
            onClose={() => {
              setPriceRange([0, 30000000]);
              dispatch(getProductListAction({
                page: 1,
                categoriesSelected,
                priceRange: [0, 30000000],
                searchKey,
              }));
            }}>
            {`Giá từ: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}`}
          </Tag>
        )}
      </Space>
    )
  }

  function renderCategoryCheckbox() {
    const categoryCheckbox = categoryList.data.map((categoryItem) => ({ 
      label: categoryItem.name,
      value: categoryItem.id,
    }));
    return (
      <Checkbox.Group
        options={categoryCheckbox}
        onChange={(value) => handleFilterCategory(value)}
        value={categoriesSelected}
      />
    )
  }

  function renderProductList() {
    return productList.data.map((productItem, productIndex) => {
      return (
        <Col span={6} key={`product-item-${productItem.id}`}>
          <Link to={`/product/${productItem.id}`}>
            <Card
              size="small"
              title={productItem.name}
            >
              <div>{productItem.price.toLocaleString()}</div>
            </Card>
          </Link>
        </Col>
      )
    })
  }

  return (
    <div>
      <div>Home Page</div>
      <div style={{ padding: 16 }}>
        <Row gutter={16}>
          <Col span={4}>
            <Card title="Category Filter" size="small">
              {renderCategoryCheckbox()}
            </Card>
            <Card title="Category Filter" size="small" style={{ marginTop: 16 }}>
              <Slider
                min={0}
                max={30000000}
                step={100000}
                range
                tipFormatter={(value) => value.toLocaleString()}
                onChange={(value) => handleRangePrice(value)}
                value={priceRange}
              />
            </Card>
          </Col>
          <Col span={20}>
            <Input
              placeholder="Search..."
              onChange={(e) => handleSearchProduct(e.target.value)}
              value={searchKey}
              suffix={<SearchOutlined />}
              style={{ marginBottom: 16 }}
            />
            {renderCategoryFilter()}
            <Row gutter={[16, 16]}>
              {renderProductList()}
            </Row>
            {productList.data.length % PRODUCT_LIMIT === 0 && (
              <Row justify="center" style={{ marginTop: 16 }}>
                <Button onClick={() => handleShowMore()}>
                  Show more
                </Button>
              </Row>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default HomePage;
