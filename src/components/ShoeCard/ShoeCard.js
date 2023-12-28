import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        {variant === "on-sale" ? (
          <SalePrice style={{ backgroundColor: "hsla(340, 65%, 47%, 1)" }}>
            Sale
          </SalePrice>
        ) : variant === "new-release" ? (
          <SalePrice style={{ backgroundColor: "hsla(240, 60%, 63%, 1)" }}>
            Just Released
          </SalePrice>
        ) : undefined}

        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price
            style={{
              textDecoration:
                variant === "on-sale" ? "line-through" : undefined,
            }}
          >
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {variant === "on-sale" ? (
            <OnSalePrice>{formatPrice(salePrice)} </OnSalePrice>
          ) : undefined}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  position: relative;
`;

const ImageWrapper = styled.div`
  border-radius: 16px 16px 4px 4px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  font-size: 1rem;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  margin-left: auto;
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const OnSalePrice = styled.span`
  margin-left: auto;
  color: hsla(340, 65%, 47%, 1);
  font-weight: ${WEIGHTS.medium};
`;
const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.white};
  padding: 5px 10px 4px;
  background-color: var(--bgColor);
  border-radius: 2px;
  position: absolute;
  right: -5px;
  top: 15px;
`;

export default ShoeCard;
