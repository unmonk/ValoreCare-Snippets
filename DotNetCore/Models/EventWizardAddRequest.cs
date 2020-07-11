using Sabio.Models.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Sabio.Models.Requests.Event
{
    public class EventWizardAddRequest
    {
		[Required(ErrorMessage = "EventTypeId is required")]
		public int EventTypeId { get; set; }

		[Required(ErrorMessage = "Name is required")]
		[StringLength(255)]
		public string Name { get; set; }

		[Required(ErrorMessage = "Summary is required")]
		[StringLength(255)]
		public string Summary { get; set; }

		[Required(ErrorMessage = "ShortDescription is required")]
		[StringLength(4000)]
		public string ShortDescription { get; set; }

		[Required(ErrorMessage = "VenueId is required")]
		public int VenueId { get; set; }

		[Required(ErrorMessage = "EventStatusId is required")]
		public int EventStatusId { get; set; }

		[Required(ErrorMessage = "ImageUrl is required")]
		[StringLength(400)]
		public string ImageUrl { get; set; }

		[StringLength(400)]
		public string ExternalSiteUrl { get; set; }

		[Required(ErrorMessage = "IsFree is required")]
		public Boolean IsFree { get; set; }

		[Required(ErrorMessage = "DateStart is required")]
		public DateTime DateStart { get; set; }

		[Required(ErrorMessage = "DateEnd is required")]
		public DateTime DateEnd { get; set; }

		public long Price { get; set; }

		public int Capacity { get; set; }


		//Location
		[Range(1, Int32.MaxValue)]
		public int LocationTypeId { get; set; }

		[StringLength(100, MinimumLength = 2)]
		public string LocationLineOne { get; set; }

		public string LocationLineTwo { get; set; }
	
		[StringLength(100, MinimumLength = 2)]
		public string LocationCity { get; set; }
	
		[StringLength(100, MinimumLength = 2)]
		public string LocationZip { get; set; }
	
		[Range(1, Int32.MaxValue)]
		public int LocationStateId { get; set; }
		public double LocationLatitude { get; set; }
		public double LocationLongitude { get; set; }


		//Venue

		[MaxLength(255)]
		public string VenueName { get; set; }

		[MaxLength(4000)]
		public string VenueDescription { get; set; }

		public int VenueLocationId { get; set; }

		[MaxLength(255)]
		public string VenueUrl { get; set; }


	}
}