package com.compsis.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.compsis.domain.enumeration.VehicleStatus;

/**
 * Veiculo
 */
@Entity
@Table(name = "vehicle")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Vehicle implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "color")
    private String color;

    @Column(name = "manufacturer")
    private String manufacturer;

    @Column(name = "model")
    private String model;

    @Column(name = "plate")
    private String plate;

    @Enumerated(EnumType.STRING)
    @Column(name = "vehicle_status")
    private VehicleStatus vehicleStatus;

    @OneToMany(mappedBy = "vehicle")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Media> ids = new HashSet<>();
    @OneToMany(mappedBy = "vehicle")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<VehicleClass> ids = new HashSet<>();
    @OneToMany(mappedBy = "vehicle")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Passage> ids = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getColor() {
        return color;
    }

    public Vehicle color(String color) {
        this.color = color;
        return this;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public Vehicle manufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
        return this;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }

    public String getModel() {
        return model;
    }

    public Vehicle model(String model) {
        this.model = model;
        return this;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getPlate() {
        return plate;
    }

    public Vehicle plate(String plate) {
        this.plate = plate;
        return this;
    }

    public void setPlate(String plate) {
        this.plate = plate;
    }

    public VehicleStatus getVehicleStatus() {
        return vehicleStatus;
    }

    public Vehicle vehicleStatus(VehicleStatus vehicleStatus) {
        this.vehicleStatus = vehicleStatus;
        return this;
    }

    public void setVehicleStatus(VehicleStatus vehicleStatus) {
        this.vehicleStatus = vehicleStatus;
    }

    public Set<Media> getIds() {
        return ids;
    }

    public Vehicle ids(Set<Media> media) {
        this.ids = media;
        return this;
    }

    public Vehicle addId(Media media) {
        this.ids.add(media);
        media.setVehicle(this);
        return this;
    }

    public Vehicle removeId(Media media) {
        this.ids.remove(media);
        media.setVehicle(null);
        return this;
    }

    public void setIds(Set<Media> media) {
        this.ids = media;
    }

    public Set<VehicleClass> getIds() {
        return ids;
    }

    public Vehicle ids(Set<VehicleClass> vehicleClasses) {
        this.ids = vehicleClasses;
        return this;
    }

    public Vehicle addId(VehicleClass vehicleClass) {
        this.ids.add(vehicleClass);
        vehicleClass.setVehicle(this);
        return this;
    }

    public Vehicle removeId(VehicleClass vehicleClass) {
        this.ids.remove(vehicleClass);
        vehicleClass.setVehicle(null);
        return this;
    }

    public void setIds(Set<VehicleClass> vehicleClasses) {
        this.ids = vehicleClasses;
    }

    public Set<Passage> getIds() {
        return ids;
    }

    public Vehicle ids(Set<Passage> passages) {
        this.ids = passages;
        return this;
    }

    public Vehicle addId(Passage passage) {
        this.ids.add(passage);
        passage.setVehicle(this);
        return this;
    }

    public Vehicle removeId(Passage passage) {
        this.ids.remove(passage);
        passage.setVehicle(null);
        return this;
    }

    public void setIds(Set<Passage> passages) {
        this.ids = passages;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Vehicle vehicle = (Vehicle) o;
        if (vehicle.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), vehicle.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Vehicle{" +
            "id=" + getId() +
            ", color='" + getColor() + "'" +
            ", manufacturer='" + getManufacturer() + "'" +
            ", model='" + getModel() + "'" +
            ", plate='" + getPlate() + "'" +
            ", vehicleStatus='" + getVehicleStatus() + "'" +
            "}";
    }
}