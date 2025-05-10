"use client";

import React, { useState } from 'react';

interface PropertyDetailsTabProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const PropertyDetailsTab: React.FC<PropertyDetailsTabProps> = ({ formData, handleChange }) => {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-800 mb-4">Property Details</h2>
      <div className="space-y-4">
        {/* Total Lot Size and Total Build Area in one row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="totalLotSize" className="block mb-2 text-sm font-medium text-gray-700">
              Total Lot Size
            </label>
            <div className="flex">
              <input
                type="number"
                id="totalLotSize"
                name="totalLotSize"
                value={formData.totalLotSize ?? ""}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <select
                id="totalLotSizeUnit"
                name="totalLotSizeUnit"
                value={formData.totalLotSizeUnit ?? ""}
                onChange={handleChange}
                className="px-4 py-3 bg-gray-100 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Acres">Acres</option>
                <option value="Sq Ft">Sq Ft</option>
                <option value="Sq M">Sq M</option>
              </select>
            </div>
          </div>
          
          <div>
            <label htmlFor="totalBuildArea" className="block mb-2 text-sm font-medium text-gray-700">
              Total Build Area
            </label>
            <div className="flex">
              <input
                type="number"
                id="totalBuildArea"
                name="totalBuildArea"
                value={formData.totalBuildArea ?? ""}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <select
                id="totalBuildAreaUnit"
                name="totalBuildAreaUnit"
                value={formData.totalBuildAreaUnit ?? ""}
                onChange={handleChange}
                className="px-4 py-3 bg-gray-100 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Sq Ft">Sq Ft</option>
                <option value="Sq M">Sq M</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Building Class */}
        <div>
          <label htmlFor="buildingClass" className="block mb-2 text-sm font-medium text-gray-700">
            Building Class
          </label>
          <input
            type="text"
            id="buildingClass"
            name="buildingClass"
            value={formData.buildingClass ?? ""}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        
        {/* Furniture, Fixtures, And Equipment(s) */}
        <div>
          <label htmlFor="furniture" className="block mb-2 text-sm font-medium text-gray-700">
            Furniture, Fixtures, And Equipment(s)
          </label>
          <input
            type="text"
            id="furniture"
            name="furniture"
            value={formData.furniture ?? ""}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        
        {/* APN, Assessors Parcel # in one row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="apn" className="block mb-2 text-sm font-medium text-gray-700">
              APN
            </label>
            <input
              type="text"
              id="apn"
              name="apn"
              value={formData.apn ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="assessorsParcel" className="block mb-2 text-sm font-medium text-gray-700">
              Assessors Parcel #
            </label>
            <input
              type="text"
              id="assessorsParcel"
              name="assessorsParcel"
              value={formData.assessorsParcel ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        
        {/* Lot Number, Block Number in one row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="lotNumber" className="block mb-2 text-sm font-medium text-gray-700">
              Lot Number
            </label>
            <input
              type="text"
              id="lotNumber"
              name="lotNumber"
              value={formData.lotNumber ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="blockNumber" className="block mb-2 text-sm font-medium text-gray-700">
              Block Number
            </label>
            <input
              type="text"
              id="blockNumber"
              name="blockNumber"
              value={formData.blockNumber ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        
        {/* Parcel/Sidewell#, Title in one row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="parcelSidewell" className="block mb-2 text-sm font-medium text-gray-700">
              Parcel/Sidewell#
            </label>
            <input
              type="text"
              id="parcelSidewell"
              name="parcelSidewell"
              value={formData.parcelSidewell ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        
        {/* Property Type, Year Established in one row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="propertyType" className="block mb-2 text-sm font-medium text-gray-700">
              Property Type
            </label>
            <input
              type="text"
              id="propertyType"
              name="propertyType"
              value={formData.propertyType ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="yearEstablished" className="block mb-2 text-sm font-medium text-gray-700">
              Year Established
            </label>
            <input
              type="number"
              id="yearEstablished"
              name="yearEstablished"
              value={formData.yearEstablished ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        
        {/* Home Based, Relocatable in one row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label htmlFor="homeBased" className="block mb-2 text-sm font-medium text-gray-700">
              Home Based
            </label>
            <select
              id="homeBased"
              name="homeBased"
              value={formData.homeBased ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
            >
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-6 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
          
          <div className="relative">
            <label htmlFor="relocatable" className="block mb-2 text-sm font-medium text-gray-700">
              Relocatable
            </label>
            <select
              id="relocatable"
              name="relocatable"
              value={formData.relocatable ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
            >
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-6 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Lease */}
        <div>
          <label htmlFor="lease" className="block mb-2 text-sm font-medium text-gray-700">
            Lease
          </label>
          <input
            type="text"
            id="lease"
            name="lease"
            value={formData.lease ?? ""}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        
        {/* Comments section */}
        <div>
          <input
            type="text"
            id="comments"
            name="comments"
            value={formData.comments ?? ""}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Comments..."
          />
        </div>
        
        {/* Other Options */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Other Options
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="absenteeOwnerOperation"
                name="absenteeOwnerOperation"
                checked={formData.absenteeOwnerOperation ?? false}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="absenteeOwnerOperation" className="ml-2 text-sm text-gray-700">
                Absentee owner operation
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="ownerOperated"
                name="ownerOperated"
                checked={formData.ownerOperated ?? false}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="ownerOperated" className="ml-2 text-sm text-gray-700">
                Owner operated
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="semiAbsenteeOwner"
                name="semiAbsenteeOwner"
                checked={formData.semiAbsenteeOwner ?? false}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="semiAbsenteeOwner" className="ml-2 text-sm text-gray-700">
                Semi-absentee owner
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="securitySystem"
                name="securitySystem"
                checked={formData.securitySystem ?? false}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="securitySystem" className="ml-2 text-sm text-gray-700">
                Security System
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="multipleLocations"
                name="multipleLocations"
                checked={formData.multipleLocations ?? false}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="multipleLocations" className="ml-2 text-sm text-gray-700">
                Multiple Locations
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="experienceNecessary"
                name="experienceNecessary"
                checked={formData.experienceNecessary ?? false}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="experienceNecessary" className="ml-2 text-sm text-gray-700">
                Experience Necessary
              </label>
            </div>
          </div>
        </div>
          {/* Legal Descriptions */}
        <div>
          <label htmlFor="legalDescriptions" className="block mb-2 text-sm font-medium text-gray-700">
            Legal Descriptions
          </label>
          <textarea
            id="legalDescriptions"
            name="legalDescriptions"
            value={formData.legalDescriptions ?? ""}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          ></textarea>
        </div>
        
        {/* Investment Details Section */}
        <div className="mt-8 mb-4">
          <h3 className="text-lg font-medium text-gray-800">Investment Details</h3>
        </div>
        
        {/* Down Payment, Net Operating Income, Gross Operating Income in one row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="downPayment" className="block mb-2 text-sm font-medium text-gray-700">
              Down Payment($)
            </label>
            <input
              type="number"
              id="downPayment"
              name="downPayment"
              value={formData.downPayment ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="netOperatingIncome" className="block mb-2 text-sm font-medium text-gray-700">
              Net Operating Income($)
            </label>
            <input
              type="number"
              id="netOperatingIncome"
              name="netOperatingIncome"
              value={formData.netOperatingIncome ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="grossOperatingIncome" className="block mb-2 text-sm font-medium text-gray-700">
              Gross Operating Income($)
            </label>
            <input
              type="number"
              id="grossOperatingIncome"
              name="grossOperatingIncome"
              value={formData.grossOperatingIncome ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        
        {/* Capitalization Rate, Gross Rent Multiplier, Cash On Cash Return in one row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="capitalizationRate" className="block mb-2 text-sm font-medium text-gray-700">
              Capitalization Rate(%)
            </label>
            <input
              type="number"
              id="capitalizationRate"
              name="capitalizationRate"
              value={formData.capitalizationRate ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              step="0.01"
            />
          </div>
          
          <div>
            <label htmlFor="grossRentMultiplier" className="block mb-2 text-sm font-medium text-gray-700">
              Gross Rent Multiplier
            </label>
            <input
              type="number"
              id="grossRentMultiplier"
              name="grossRentMultiplier"
              value={formData.grossRentMultiplier ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              step="0.01"
            />
          </div>
          
          <div>
            <label htmlFor="cashOnCashReturn" className="block mb-2 text-sm font-medium text-gray-700">
              Cash On Cash Return(%)
            </label>
            <input
              type="number"
              id="cashOnCashReturn"
              name="cashOnCashReturn"
              value={formData.cashOnCashReturn ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              step="0.01"
            />
          </div>
        </div>
        
        {/* Proforma CAP, Proforma GRM, Proforma COCR with radio buttons in one row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Proforma CAP
            </label>
            <div className="flex items-center space-x-4 py-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="proformaCapYes"
                  name="proformaCap"
                  value="yes"
                  checked={formData.proformaCap === "yes"}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="proformaCapYes" className="ml-2 text-sm text-gray-700">
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="proformaCapNo"
                  name="proformaCap"
                  value="no"
                  checked={formData.proformaCap === "no"}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="proformaCapNo" className="ml-2 text-sm text-gray-700">
                  No
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Proforma GRM
            </label>
            <div className="flex items-center space-x-4 py-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="proformaGrmYes"
                  name="proformaGrm"
                  value="yes"
                  checked={formData.proformaGrm === "yes"}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="proformaGrmYes" className="ml-2 text-sm text-gray-700">
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="proformaGrmNo"
                  name="proformaGrm"
                  value="no"
                  checked={formData.proformaGrm === "no"}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="proformaGrmNo" className="ml-2 text-sm text-gray-700">
                  No
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Proforma COCR
            </label>
            <div className="flex items-center space-x-4 py-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="proformaCocrYes"
                  name="proformaCocr"
                  value="yes"
                  checked={formData.proformaCocr === "yes"}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="proformaCocrYes" className="ml-2 text-sm text-gray-700">
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="proformaCocrNo"
                  name="proformaCocr"
                  value="no"
                  checked={formData.proformaCocr === "no"}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="proformaCocrNo" className="ml-2 text-sm text-gray-700">
                  No
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Internal Rate Of Return, Estimation Loan Payment, EBITDA in one row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="internalRateOfReturn" className="block mb-2 text-sm font-medium text-gray-700">
              Internal Rate Of Return(%)
            </label>
            <input
              type="number"
              id="internalRateOfReturn"
              name="internalRateOfReturn"
              value={formData.internalRateOfReturn ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              step="0.01"
            />
          </div>
          
          <div>
            <label htmlFor="estimationLoanPayment" className="block mb-2 text-sm font-medium text-gray-700">
              Estimation Loan Payment($)
            </label>
            <input
              type="number"
              id="estimationLoanPayment"
              name="estimationLoanPayment"
              value={formData.estimationLoanPayment ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="ebitda" className="block mb-2 text-sm font-medium text-gray-700">
              EBITDA($)
            </label>
            <input
              type="number"
              id="ebitda"
              name="ebitda"
              value={formData.ebitda ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        
        {/* Proforma IRR with radio buttons */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Proforma IRR
          </label>
          <div className="flex items-center space-x-4 py-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="proformaIrrYes"
                name="proformaIrr"
                value="yes"
                checked={formData.proformaIrr === "yes"}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="proformaIrrYes" className="ml-2 text-sm text-gray-700">
                Yes
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="proformaIrrNo"
                name="proformaIrr"
                value="no"
                checked={formData.proformaIrr === "no"}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label htmlFor="proformaIrrNo" className="ml-2 text-sm text-gray-700">
                No
              </label>
            </div>
          </div>
        </div>
        
        {/* Cash Flow Before Tax, Cash Flow After Tax, Monthly Cash Flow in one row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="cashFlowBeforeTax" className="block mb-2 text-sm font-medium text-gray-700">
              Cash Flow Before Tax($)
            </label>
            <input
              type="number"
              id="cashFlowBeforeTax"
              name="cashFlowBeforeTax"
              value={formData.cashFlowBeforeTax ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="cashFlowAfterTax" className="block mb-2 text-sm font-medium text-gray-700">
              Cash Flow After Tax($)
            </label>
            <input
              type="number"
              id="cashFlowAfterTax"
              name="cashFlowAfterTax"
              value={formData.cashFlowAfterTax ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="monthlyCashFlow" className="block mb-2 text-sm font-medium text-gray-700">
              Monthly Cash Flow($)
            </label>
            <input
              type="number"
              id="monthlyCashFlow"
              name="monthlyCashFlow"
              value={formData.monthlyCashFlow ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        
        {/* Inventory Included In Price, Real Estate Included in one row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Inventory Included In Price
            </label>
            <div className="flex items-center space-x-4 py-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="inventoryIncludedYes"
                  name="inventoryIncluded"
                  value="yes"
                  checked={formData.inventoryIncluded === "yes"}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="inventoryIncludedYes" className="ml-2 text-sm text-gray-700">
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="inventoryIncludedNo"
                  name="inventoryIncluded"
                  value="no"
                  checked={formData.inventoryIncluded === "no"}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="inventoryIncludedNo" className="ml-2 text-sm text-gray-700">
                  No
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Real Estate Included
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="realEstateIncluded"
                name="realEstateIncluded"
                checked={formData.realEstateIncluded ?? false}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="realEstateIncluded" className="ml-2 text-sm text-gray-700">
                Is Real Estate Included?
              </label>
            </div>
          </div>
        </div>
        
        {/* Estimated Inventory and Franchise Y/N in one row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="estimatedInventory" className="block mb-2 text-sm font-medium text-gray-700">
              Estimated Inventory($)
            </label>
            <input
              type="number"
              id="estimatedInventory"
              name="estimatedInventory"
              value={formData.estimatedInventory ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Franchise Y/N
            </label>
            <div className="flex items-center space-x-4 py-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="franchiseYes"
                  name="franchise"
                  value="yes"
                  checked={formData.franchise === "yes"}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="franchiseYes" className="ml-2 text-sm text-gray-700">
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="franchiseNo"
                  name="franchise"
                  value="no"
                  checked={formData.franchise === "no"}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label htmlFor="franchiseNo" className="ml-2 text-sm text-gray-700">
                  No
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Franchise Transfer Fee */}
        <div>
          <label htmlFor="franchiseTransferFee" className="block mb-2 text-sm font-medium text-gray-700">
            Franchise Transfer Fee($)
          </label>
          <input
            type="number"
            id="franchiseTransferFee"
            name="franchiseTransferFee"
            value={formData.franchiseTransferFee ?? ""}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        
        {/* Company Type */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Company Type
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="companyTypeIndividual"
                name="companyTypeIndividual"
                checked={formData.companyTypeIndividual ?? false}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="companyTypeIndividual" className="ml-2 text-sm text-gray-700">
                Individual(s)
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="companyTypePartnership"
                name="companyTypePartnership"
                checked={formData.companyTypePartnership ?? false}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="companyTypePartnership" className="ml-2 text-sm text-gray-700">
                A Partnership
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="companyTypeLLC"
                name="companyTypeLLC"
                checked={formData.companyTypeLLC ?? false}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="companyTypeLLC" className="ml-2 text-sm text-gray-700">
                An LLC
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="companyTypeLLP"
                name="companyTypeLLP"
                checked={formData.companyTypeLLP ?? false}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="companyTypeLLP" className="ml-2 text-sm text-gray-700">
                An LLP
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="companyTypeCorporation"
                name="companyTypeCorporation"
                checked={formData.companyTypeCorporation ?? false}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="companyTypeCorporation" className="ml-2 text-sm text-gray-700">
                A Corporation
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="companyTypeOther"
                name="companyTypeOther"
                checked={formData.companyTypeOther ?? false}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="companyTypeOther" className="ml-2 text-sm text-gray-700">
                Other
              </label>
            </div>
          </div>
        </div>
        
        {/* Ownership Type */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Ownership Type
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="ownershipTypeOwn"
                name="ownershipTypeOwn"
                checked={formData.ownershipTypeOwn ?? false}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="ownershipTypeOwn" className="ml-2 text-sm text-gray-700">
                Own
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="ownershipTypeRent"
                name="ownershipTypeRent"
                checked={formData.ownershipTypeRent ?? false}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="ownershipTypeRent" className="ml-2 text-sm text-gray-700">
                Rent
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="ownershipTypeSubLease"
                name="ownershipTypeSubLease"
                checked={formData.ownershipTypeSubLease ?? false}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="ownershipTypeSubLease" className="ml-2 text-sm text-gray-700">
                Sub Lease
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="ownershipTypeLease"
                name="ownershipTypeLease"
                checked={formData.ownershipTypeLease ?? false}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="ownershipTypeLease" className="ml-2 text-sm text-gray-700">
                Lease
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="ownershipTypeUnderContract"
                name="ownershipTypeUnderContract"
                checked={formData.ownershipTypeUnderContract ?? false}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="ownershipTypeUnderContract" className="ml-2 text-sm text-gray-700">
                Under Contract to Own
              </label>
            </div>
          </div>
        </div>
          {/* Air Rights */}
        <div>
          <label htmlFor="airRights" className="block mb-2 text-sm font-medium text-gray-700">
            Air Rights
          </label>
          <div className="flex">
            <input
              type="text"
              id="airRights"
              name="airRights"
              value={formData.airRights ?? ""}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <select
              id="airRightsUnit"
              name="airRightsUnit"
              value={formData.airRightsUnit ?? ""}
              onChange={handleChange}
              className="px-4 py-3 bg-gray-100 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="Sq Ft">Sq Ft</option>
              <option value="Sq M">Sq M</option>
              <option value="Acres">Acres</option>
            </select>
          </div>
        </div>
          {/* Additional Details Section */}
        <div className="mt-8 mb-4">
          <h3 className="text-lg font-medium text-gray-800">Additional Details</h3>
        </div>
        
        {/* Investment Highlights and Pro's And Con's in one row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="investmentHighlights" className="block mb-2 text-sm font-medium text-gray-700">
              Investment Highlights
            </label>
            <textarea
              id="investmentHighlights"
              name="investmentHighlights"
              value={formData.investmentHighlights ?? ""}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            ></textarea>
          </div>
          
          <div>
            <label htmlFor="prosAndCons" className="block mb-2 text-sm font-medium text-gray-700">
              Pro's And Con's
            </label>
            <textarea
              id="prosAndCons"
              name="prosAndCons"
              value={formData.prosAndCons ?? ""}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            ></textarea>
          </div>
        </div>
        
        {/* Training/Support and Expansion Potential in one row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="trainingSupport" className="block mb-2 text-sm font-medium text-gray-700">
              Training/Support
            </label>
            <textarea
              id="trainingSupport"
              name="trainingSupport"
              value={formData.trainingSupport ?? ""}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            ></textarea>
          </div>
          
          <div>
            <label htmlFor="expansionPotential" className="block mb-2 text-sm font-medium text-gray-700">
              Expansion Potential
            </label>
            <textarea
              id="expansionPotential"
              name="expansionPotential"
              value={formData.expansionPotential ?? ""}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            ></textarea>
          </div>
        </div>
        
        {/* Competition / Market and Reason For Sale in one row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="competitionMarket" className="block mb-2 text-sm font-medium text-gray-700">
              Competition / Market
            </label>
            <textarea
              id="competitionMarket"
              name="competitionMarket"
              value={formData.competitionMarket ?? ""}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            ></textarea>
          </div>
          
          <div>
            <label htmlFor="reasonForSale" className="block mb-2 text-sm font-medium text-gray-700">
              Reason For Sale
            </label>
            <textarea
              id="reasonForSale"
              name="reasonForSale"
              value={formData.reasonForSale ?? ""}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsTab;
